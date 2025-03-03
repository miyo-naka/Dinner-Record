import { NextResponse } from "next/server";
import { deleteCookie } from "cookies-next";
import { auth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    await auth.revokeRefreshTokens(token);
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
