import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const data = await fetch(`https://fakestoreapi.com/products/${id}`);
    const json = await data.json();
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: "There is some error fetching the single product", status: 500 });
  }
}
