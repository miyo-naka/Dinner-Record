import { db } from "@/lib/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export type Record = {
  id?: string; // Firestore の ID
  date: string;
  dishName: string;
  note: string;
};

const allRecords = collection(db, "dinner_records");

//登録処理(Create)(local)
// export function createRecord(newRecord: Record) {
//   const records = loadRecords();
//   const updatedRecords = [...records, newRecord];
//   localStorage.setItem("dinner_records", JSON.stringify(updatedRecords));
//   return updatedRecords;
// }

//登録処理(Create)(Firestore)
export async function createRecord(newRecord: Record) {
  const docRef = await addDoc(allRecords, newRecord);
  return { ...newRecord, id: docRef.id }; // Firestore の ID を追加して返す
}

//データ取得(Read)(local)
// export function loadRecords() {
//   const savedRecords = localStorage.getItem("dinner_records");
//   if (savedRecords) {
//     const allRecords = JSON.parse(savedRecords);
//     return allRecords;
//   } else {
//     return [];
//   }
// }

//データ取得(Read)(Firestore)
export async function loadRecords() {
  const querySnapshot = await getDocs(allRecords);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Record[];
}

//更新処理(Update)(local)
// export function updateRecord(allRecords: Record[], updatedRecord: Record) {
//   const updatedAllRecords = allRecords.map((record) =>
//     record.date === updatedRecord.date ? updatedRecord : record
//   );
//   localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
//   return updatedAllRecords;
// }

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

//削除処理(Delete)
// export function deleteRecord(allRecords: Record[], globalIndex: number) {
//   const updatedAllRecords = allRecords.filter((_, i) => i !== globalIndex);
//   localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
//   return updatedAllRecords;
// }
// 削除処理 (Delete)
export async function deleteRecord(recordId: string) {
  const recordRef = doc(db, "dinner_records", recordId);
  await deleteDoc(recordRef);
}
