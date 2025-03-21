import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/", "/history", "/record"]; //ログインが必要なページ
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("__session")?.value;

  // console.log("Received sessionCookie:", sessionCookie); //デバッグ

  //認証必須ページ & 未ログインなら `/auth/login` にリダイレクト
  if (protectedRoutes.includes(pathname)) {
    if (!sessionCookie) {
      console.log("Redirecting to login...");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (pathname === "/auth/login") {
      return NextResponse.next(); // ログインページにはリダイレクトしない
    }

    // API Route でセッションの検証
    const response = await fetch(`${req.nextUrl.origin}/api/auth/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `__session=${sessionCookie}`,
      },
    });

    if (!response.ok) {
      console.log("Invalid token, redirecting to login...");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/history", "/record"], // 適用するページ
};
