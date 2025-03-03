import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
// import admin from "firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    // Firebase の管理者 SDK でカスタムトークンを発行
    const userRecord = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(userRecord.uid);
    return NextResponse.json({ token: customToken });

    // const { idToken } = await req.json(); //Firebase IDトークンを取得
    // console.log("Received token:", idToken);
    // if (!idToken) {
    //   throw new Error("No ID token provided");
    // }
    // const decodedToken = await auth.verifyIdToken(idToken);
    // console.log("Decoded token:", decodedToken);
    // return NextResponse.json({ user: decodedToken });
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "ログインに失敗しました", details: error.message },
      { status: 401 }
    );
  }
}
