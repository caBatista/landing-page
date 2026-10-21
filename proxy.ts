import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/** Private tools live under this prefix (see app/(private)/README.md). */
const PRIVATE_PREFIX = "/me";

function hasPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasPrefix(pathname, PRIVATE_PREFIX)) {
    // Authentication for private tools goes here before any of them ships.
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // "/en/..." is served without a prefix: redirect to the canonical URL.
  if (hasPrefix(pathname, `/${defaultLocale}`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (locales.some((locale) => hasPrefix(pathname, `/${locale}`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|icon|apple-icon|opengraph-image|sitemap.xml|robots.txt|.*\\..*).*)"],
};
