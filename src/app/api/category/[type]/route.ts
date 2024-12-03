import { Product } from "@/interfaces/Types";
import { NextRequest, NextResponse } from "next/server";
const filesystem = require('fs');
const path = require('path');

export async function GET(req: NextRequest) {
    const type = req.nextUrl.pathname.split('/').pop();
    try {
        // GETTING FILE PATH from CURRENT WORK DICTIONARY (process.cwd())
        const filePath = path.join(process.cwd(), 'src', 'json', 'db.json');
        // REEADING THE FILE SYNC (AS A STRING)
        const jsonFile = filesystem.readFileSync(filePath, 'utf-8');
        // CHANGE THE FILE READED TO A JSON FILE
        const parsedJson = JSON.parse(jsonFile);
        // RETURNING ME THE PRODUCTS I NEED
        const filteredProducts = parsedJson?.products.filter((product: Product) => product.type === type);
        if (type === 'all') return NextResponse.json(parsedJson?.products);
        return NextResponse.json(filteredProducts)
    } catch (error) {
        return NextResponse.json({ message: 'Sorry try again!' })
    }
}