import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const sessionCookie = req.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("__session="))
      ?.split("=")[1];

    if (!sessionCookie) {
      return NextResponse.json({ error: "No session found" }, { status: 400 });
    }

    // セッション Cookie を検証し、ユーザー ID（uid）を取得
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    await auth.revokeRefreshTokens(decodedToken.uid);

    // セッションクッキーを削除
    const response = NextResponse.json({ message: "Logged out successfully" });
    // ユーザーのリフレッシュトークンを無効化（ログアウト）
    response.cookies.set("__session", "", { expires: new Date(0), path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
