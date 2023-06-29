import { insertProduct } from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  const product = await request.json();

  try {
    await insertProduct(product);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      {
        error:
          "Error creating the db record for the product",
        product: null,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { product, error: null },
    { status: 201 }
  );
}
