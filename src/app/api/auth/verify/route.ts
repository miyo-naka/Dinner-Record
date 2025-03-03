import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
// import { setCookie } from "cookies-next";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json(); //Firebase IDトークンを取得
    const decodedToken = await auth.verifyIdToken(idToken);

    // setCookie("__session", idToken, { httpOnly: true, secure: true });

    return NextResponse.json({ user: decodedToken });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
