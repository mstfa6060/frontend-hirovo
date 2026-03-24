import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/dashboard", "/applications", "/profile", "/favorites", "/employer", "/social", "/users", "/messages", "/notifications", "/search"];
const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale and path
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] || "tr";
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

  const token = request.cookies.get("hirovo_jwt")?.value;

  // Redirect authenticated users away from auth pages
  if (authPaths.some((p) => pathWithoutLocale.startsWith(p)) && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect unauthenticated users to login from protected pages
  if (protectedPaths.some((p) => pathWithoutLocale.startsWith(p)) && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
