import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/'];

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('jwt_token')?.value;
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  if (!jwtToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // TODO: check the token validity
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /api (API routes)
     * - /_next/static (static assets)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     * Add any other top-level static files or folders you want to exclude
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
