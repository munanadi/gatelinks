import {
  getAllProducts,
  getOwnedProducts,
  getProductDetails,
  insertProduct,
} from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  response: Response
) {
  const pathName = request.url.split("/");
  const productId = pathName[pathName.length - 1];

  let result;
  try {
    if (productId) {
      result = await getProductDetails(productId);
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
