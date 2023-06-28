import { NextResponse } from "next/server";
import { getAllProducts } from "@/db/helpers";

export async function GET(request: Request) {
  const quotes = await getAllProducts();

  return NextResponse.json(quotes);
}
