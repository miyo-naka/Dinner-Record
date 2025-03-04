import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json(); // クライアントから idToken を受け取る
    if (!idToken) {
      return NextResponse.json(
        { error: "IDトークンが必要です" },
        { status: 400 }
      );
    }

    // IDトークンを検証し、セッションクッキーを作成
    const decodedToken = await auth.verifyIdToken(idToken);
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    }); // 5日間

    const response = NextResponse.json({ success: true });
    response.cookies.set("__session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "ログインに失敗しました", details: error.message },
      { status: 401 }
    );
  }
}
