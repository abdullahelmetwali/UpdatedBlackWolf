// @ts-nocheck
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
    const { tag } = await context.params;

    if (!tag || tag.length === 0) {
        return NextResponse.json({ message: 'Tag is required', success: false }, { status: 400 });
    }

    const locale = req.headers.get('x-locale') || 'en';
    const TAG_NAME = `/${tag.join('/')}`;
    const ROUTE_PATH = `/${locale}${TAG_NAME}`;

    try {
        revalidateTag(TAG_NAME);
        revalidatePath(ROUTE_PATH);

        return NextResponse.json({ success: true, tag: TAG_NAME, requestedURL: tag });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};