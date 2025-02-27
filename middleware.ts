import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value; //Firebase認証トークン取得

  // ログインが必要なページのパス
  const protectedRoutes = ["/", "/history", "/record"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !authToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/history", "/record"], // 適用するページ
};
