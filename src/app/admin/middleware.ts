import { NextResponse } from "next/server";
import { verifyHash } from "@/lib/security";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/admin/", ""); // Extract hashed path

  const validRoutes = ["/admin/dashboard", "/admin/settings"];
  const isValid = validRoutes.some((route) => verifyHash(path, route));

  if (!isValid) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only to /admin/*
export const config = {
  matcher: "/admin/:path*",
};
