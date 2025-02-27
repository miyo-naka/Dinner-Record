import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/", "/history", "/record"]; //ログインが必要なページ
  const pathname = req.nextUrl.pathname; //アクセスしようとしているページのパスを取得
  const token = req.cookies.get("__session")?.value;

  //認証必須ページ & 未ログインなら `/auth/login` にリダイレクト
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next(); // 問題なければそのまま進む
}

export const config = {
  matcher: ["/", "/history", "/record"], // 適用するページ
};
