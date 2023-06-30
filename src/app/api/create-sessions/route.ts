import sdk from "@/helpers/candypay";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  response: Response
) {
  // const data = await request.json();
  // console.log({ data });
  try {
    const res = await sdk.session.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      // additional tokens you can pass, SOL and USDC are default
      // tokens: ["bonk", "samo"],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.001,
          image: "https://imgur.com/M0l5SDh.png",
          quantity: 1,
          // optional product size parameter
          // size: "9",
        },
      ],
      shipping_fees: 0.0,
    });

    return NextResponse.json({ result: res, error: null });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: null, error: "Error Creating session" },
      { status: 500 }
    );
  }

  // try {
  //   const result = await insertProduct(data.product);
  //   console.log({ result });
  // } catch (e: any) {
  //   console.log(e.message);

  //   return NextResponse.json(
  //     {
  //       error: `Error ${e.message}`,
  //       product: null,
  //     },
  //     { status: 500 }
  //   );
  // }

  // return NextResponse.json(
  //   { product: data.product, error: null },
  //   { status: 201 }
  // );
}
