import {
  getAllProducts,
  getOwnedProducts,
  insertProduct,
} from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  response: Response
) {
  const searchParams = new URLSearchParams(request.url);
  const walletAddress = searchParams.get("walletAddress");

  let result;
  try {
    if (walletAddress) {
      result = await getOwnedProducts(walletAddress);
    } else {
      result = await getAllProducts();
    }
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
    { product: result, error: null },
    { status: 200 }
  );
}
