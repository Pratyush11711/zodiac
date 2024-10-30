import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
try {
  const data = await fetch("https://fakestoreapi.com/products")
  const json = await data.json()

  return NextResponse.json(json)
} catch (error) {
    return NextResponse.json({error:"Failed To Fetch Products"},{status:500})
}


    
}
