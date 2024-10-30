import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
try {
    const {searchParams} = new URL(req.url)
    const category = searchParams.get("category")
    if (!category) {
        return NextResponse.json({ error: "Category not provided", status: 400 });
      }
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const json = await response.json()
    return NextResponse.json(json)
} catch (error) {
    return  NextResponse.json({error:"Unable to fetch specific category",status:500})
}
}