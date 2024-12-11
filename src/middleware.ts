import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const u = request?.cookies?.get('u')?.value;
    if (!u && request.nextUrl.pathname.startsWith('/account/u')) {
        return NextResponse.rewrite(new URL('/account/login', request.url));
    }
    if (u && request.nextUrl.pathname.startsWith('/account/login')) {
        const userName = u.replaceAll('"', '');
        return NextResponse.redirect(new URL(`/account/u/${userName}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/account/u/:path*', '/account/login'],
};