import { checkPurchase } from "@/db/helpers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  const data = await request.json();
  const walletAddress = data.wallet;
  const productHash = data.productHash;

  let result;
  try {
    if (walletAddress && productHash) {
      result = await checkPurchase(
        walletAddress,
        productHash
      );
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
