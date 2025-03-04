import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    await auth.revokeRefreshTokens(token); // トークンを無効化
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
