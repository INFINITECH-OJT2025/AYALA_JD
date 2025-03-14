import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname; // ✅ Use the direct path without modification

  const validRoutes = ["/admin/dashboard", "/admin/settings"];
  const isValid = validRoutes.includes(path); // ✅ Direct comparison, no hashing

  if (!isValid) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to /admin/*
export const config = {
  matcher: "/admin/:path*",
};
