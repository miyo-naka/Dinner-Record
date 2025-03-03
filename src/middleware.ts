import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/", "/history", "/record"]; //ログインが必要なページ
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("__session")?.value;

  //認証必須ページ & 未ログインなら `/auth/login` にリダイレクト
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    try {
      await auth.verifyIdToken(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/history", "/record"], // 適用するページ
};
