import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import useAuthStore from "./stores/useAuthStore";

export function middleware(request: NextRequest) {
  const token = useAuthStore.getState().token;

  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
