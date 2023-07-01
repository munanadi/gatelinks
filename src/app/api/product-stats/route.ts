import {
  getNumberOfProductsSold,
  getTotalRevenue,
} from "@/db/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  response: Response
) {
  const data = await request.json();

  let result;
  try {
    console.log("Comes here?")
    const numberSold = await getNumberOfProductsSold(
      data.wallet
    );
    const totalRevenue = await getTotalRevenue(data.wallet);

    result = {
      numberSold,
      totalRevenue,
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
