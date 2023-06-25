import { NextRequest, NextResponse } from "next/server";
import sdk from "../../../helpers/candypay";

export async function POST(
  req: NextRequest,
  res: NextResponse
) {
  try {
    const response = await sdk.session.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      // additional tokens you can pass, SOL and USDC are default
      tokens: ["bonk", "samo"],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.01,
          image: "https://imgur.com/M0l5SDh.png",
          quantity: 1,
          // optional product size parameter
          size: "9",
        },
      ],
      shipping_fees: 0.01,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error creating sessions" },
      { status: 500 }
    );
  }
}
