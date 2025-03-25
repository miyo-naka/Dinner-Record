import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "@/lib/firebaseAdmin";

//データ取得
export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // セッションクッキーを検証
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedToken.uid;

    // Firestore からデータを取得 (例: ユーザーごとの記録)
    const recordsRef = db
      .collection("users")
      .doc(userId)
      .collection("dinner_records");
    const snapshot = await recordsRef.get();
    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

//データ登録
export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedToken.uid;

    const { date, dishName, note } = await req.json();

    const newRecord = { date, dishName, note, createdAt: new Date() };
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("dinner_records")
      .add(newRecord);

    return NextResponse.json({ id: docRef.id, ...newRecord });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 }
    );
  }
}

//データ更新
export async function PUT(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedToken.uid;

    const { id, date, dishName, note } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Record ID is required" },
        { status: 400 }
      );
    }

    const recordRef = db
      .collection("users")
      .doc(userId)
      .collection("dinner_records")
      .doc(id);
    await recordRef.update({ date, dishName, note });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}

//データ削除
export async function DELETE(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedToken.uid;

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Record ID is required" },
        { status: 400 }
      );
    }

    const recordRef = db
      .collection("users")
      .doc(userId)
      .collection("dinner_records")
      .doc(id);
    await recordRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
