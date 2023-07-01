import { insertUser } from "@/db/helpers";
import { candypay } from "@/helpers/candypay";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  console.log(data.user, data.product);

  try {
    // Get paid
    const originURL = new URL(request.url).origin;

    const response = await candypay.session.create({
      success_url: `${originURL}/purchases`,
      cancel_url: `${originURL}`,
      items: [data.product],
    });

    // Store in DB
    const userResult = await insertUser(data.user);

    // return Response.redirect(response.payment_url);
    return NextResponse.json({
      user: userResult,
      error: null,
      candypay: response,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      {
        error: `Error: ${e.message}`,
        user: null,
        candypay: null,
      },
      { status: 500 }
    );
  }
}
