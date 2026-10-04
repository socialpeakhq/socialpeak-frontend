import { AUTH_SESSION_COOKIE_NAME } from "@/lib/authCookieName";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only checks that a session exists so logged-out users don't see /app flash
// before the client redirects. Token validity is enforced by the API (401 ->
// refresh -> /login in apiClient), not here.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(AUTH_SESSION_COOKIE_NAME);

  if (pathname.startsWith("/app") && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
