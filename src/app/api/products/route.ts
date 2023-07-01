import {
  getAllProducts,
  getAllProductsNotOwned,
  getOwnedProducts,
  insertProduct,
} from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  const data = await request.json();
  const walletAddress = data.wallet;

  // Show products that are owned by others
  const searchParams = new URL(request.url);
  const discover =
    searchParams.searchParams.get("discover");

  let result;
  try {
    if (discover && walletAddress) {
      result = await getAllProductsNotOwned(walletAddress);
    } else if (walletAddress) {
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
