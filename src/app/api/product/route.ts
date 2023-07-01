import { getProducts } from "@/db/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  response: Response
) {
  const data = await request.json();
  const productHashes = data;

  let result;
  try {
    const productDetails = await getProducts(productHashes);

    result = {
      productDetails,
    };
  } catch (e: any) {
    console.log(e.message);

    return NextResponse.json(
      {
        error: `Error ${e.message}`,
        result: null,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { result, error: null },
    { status: 200 }
  );
}
