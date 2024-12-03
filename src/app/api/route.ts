import { NextRequest, NextResponse } from 'next/server';
const fs = require('fs');
const path = require('path');

export async function GET(_: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'json', 'db.json');
        const jsonFile = fs.readFileSync(filePath, 'utf-8');
        return NextResponse.json(JSON.parse(jsonFile))
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' })
    }
}

