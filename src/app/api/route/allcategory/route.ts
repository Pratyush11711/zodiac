import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const data = await fetch('https://fakestoreapi.com/products/categories')
        const json = await data.json()
        return NextResponse.json(json)
    } catch (error) {
        return NextResponse.json({error:"There is some error fetching categories",status:500})
    }
}