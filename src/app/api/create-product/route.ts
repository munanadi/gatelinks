import { insertProduct } from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  const data = await request.json();

  try {
    const result = await insertProduct(data.product);
    console.log({ result });
  } catch (e: any) {
    console.log(e.message);

    return NextResponse.json(
      {
        error: `Error ${e.message}`,
        product: null,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { product: data.product, error: null },
    { status: 201 }
  );
}
