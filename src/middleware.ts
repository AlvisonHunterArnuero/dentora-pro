import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signin"];

const PROTECTED_PATHS = ["/appointments"];

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwt_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.includes(pathname) && jwtToken) {
    return NextResponse.redirect(new URL("/appointments", request.url));
  }

  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path)) && !jwtToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
