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
      return NextResponse.json(
        { error: "セッションクッキーが見つかりません" },
        { status: 401 }
      );
    }

    // セッションクッキーの検証
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    // console.log("Verified token:", decodedToken);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error verifying token:", error.message);
    return NextResponse.json({ error: "無効なセッション" }, { status: 401 });
  }
}
