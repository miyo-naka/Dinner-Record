export type Record = {
  id?: string; // Firestore の ID
  date: string;
  dishName: string;
  note: string;
  category: string;
};

//登録処理(Create)(Firestore)
export async function createRecord(newRecord: Record) {
  try {
    await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application / json" },
      body: JSON.stringify(newRecord),
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

//データ取得(Read)(Firestore)
export async function loadRecords() {
  try {
    const res = await fetch("api/records");
    if (!res.ok) throw new Error("unsuccesful to get data");
    const records = await res.json();
    return records.map((doc: any) => ({
      id: doc.id,
      ...doc,
    }));
  } catch (error) {
    console.error("エラー：", error);
    return [];
  }
}

// 更新処理 (Update)(Firestore)
export async function updateRecord(updatedRecord: Record) {
  if (!updatedRecord.id) return; // ID がなければ更新できない

  try {
    await fetch("/api/records", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecord),
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 削除処理 (Delete)
export async function deleteRecord(recordId: string) {
  try {
    await fetch("/api/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recordId }),
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
