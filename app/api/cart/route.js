import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
    const data = await request.json();
    const ids = data.ids;
    const products = await Product.find({ _id: { $in: ids } });
    return NextResponse.json(products);
}
