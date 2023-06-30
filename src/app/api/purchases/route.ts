import { getAllPurchases } from "@/db/helpers";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  const data = await request.json();
  const walletAddress = data.wallet;

  let result;
  try {
    if (walletAddress) {
      result = await getAllPurchases(walletAddress);
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
