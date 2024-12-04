import { FetchToCache } from "@/hooks/FetchToCache";
import { Product } from "@/interfaces/Types";
import { NextRequest, NextResponse } from "next/server";

const { groupTypes, parsedJson } = FetchToCache();
let product: Product | undefined = undefined;

export async function GET(req: NextRequest) {
    const title = req.nextUrl.pathname.split('/').pop();
    const type = req.nextUrl.pathname.split('/')[3];
    // console.log(type)
    try {
        if (type === 'all') {
            product = parsedJson?.products?.find((pro: Product) => pro.title.replaceAll(' ', '-').toLowerCase() === title)
        } else {
            product = groupTypes?.get(type)?.find((pro: Product) => pro.title.replaceAll(' ', '-').toLowerCase() === title)
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ data: { message: "Can't get the product." } })
    }
}