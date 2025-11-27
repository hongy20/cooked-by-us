import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const protectedRoutesPattern = /^\/dashboard(\/|$)/;

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/recipe", request.url));
  }

  const isProtectedRoute = protectedRoutesPattern.test(path);
  const session = await getSession();

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
