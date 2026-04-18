import { AUTH_TOKEN_COOKIE_NAME } from "@/lib/authCookieName";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function readAuthTokenFromRequest(request: NextRequest) {
  const raw = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = readAuthTokenFromRequest(request);

  if (pathname.startsWith("/app") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
