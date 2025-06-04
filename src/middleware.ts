import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/'];
const PROTECTED_PATHS = ['/appointments'];

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('jwt_token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from public routes
  if (PUBLIC_PATHS.includes(pathname) && jwtToken) {
    return NextResponse.redirect(new URL('/appointments', request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (PROTECTED_PATHS.some(path => pathname.startsWith(path)) && !jwtToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
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
