import { FetchToCache } from "@/hooks/FetchToCache";
import { Product } from "@/interfaces/Types";
import { NextRequest, NextResponse } from "next/server";

let cachedDT: Map<string | undefined, Product[]> | null = null;
let cachedProducts: Product[] | null = null;

const toSeeCached = () => {
    const { groupTypes, parsedJson } = FetchToCache();
    cachedDT = groupTypes;
    cachedProducts = parsedJson?.products;
};

export async function GET(req: NextRequest) {
    const type: string | undefined = req.nextUrl.pathname.split('/').pop();
    try {
        if (!cachedDT || !cachedProducts) {
            toSeeCached();
        }
        const filteredProducts = cachedDT?.get(type);
        if (type === 'all') return NextResponse.json(cachedProducts);
        return NextResponse.json(filteredProducts)
    } catch (error) {
        throw new Error('Sorry, try again!')
    }
};