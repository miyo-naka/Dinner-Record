import { db } from "@/lib/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export type Record = {
  id?: string; // Firestore の ID
  date: string;
  dishName: string;
  note: string;
};

//ユーザー情報取得
const user = getAuth().currentUser;
if (!user) {
  console.error("ユーザーがログインしていません");
}
const userId = user?.uid;
const userRecords = collection(db, `users/${userId}/dinner_records`);

//登録処理(Create)(Firestore)
export async function createRecord(newRecord: Record) {
  const docRef = await addDoc(userRecords, newRecord);
  return { ...newRecord, id: docRef.id }; // Firestore の ID を追加して返す
}

//データ取得(Read)(Firestore)
export async function loadRecords() {
  const querySnapshot = await getDocs(userRecords);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Record[];
}

// 更新処理 (Update)(Firestore)
export async function updateRecord(updatedRecord: Record) {
  if (!updatedRecord.id) return; // ID がなければ更新できない
  const recordRef = doc(db, "dinner_records", updatedRecord.id);
  await updateDoc(recordRef, {
    date: updatedRecord.date,
    dishName: updatedRecord.dishName,
    note: updatedRecord.note,
  });
}

// 削除処理 (Delete)
export async function deleteRecord(recordId: string) {
  const recordRef = doc(db, "dinner_records", recordId);
  await deleteDoc(recordRef);
}
