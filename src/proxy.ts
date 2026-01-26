import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from './lib/auth';

export function proxy(request: NextRequest) {
    const token = request?.cookies?.get("BW_TOKEN")?.value;
    const accessTodashboard = isAdmin(token);

    if (!token &&
        (request.nextUrl.pathname.startsWith("/dashboard")
            || request.nextUrl.pathname.startsWith("/profile"))
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && request.nextUrl.pathname.startsWith('/login') && accessTodashboard) {
        return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }

    if (token && request.nextUrl.pathname.startsWith('/login') && !accessTodashboard) {
        return NextResponse.redirect(new URL(`/profile`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/login", "/dashboard/:path*"],
};