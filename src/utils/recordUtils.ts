export type Record = {
  date: string;
  dishName: string;
  note: string;
};

//登録処理(Create)

//データ取得(Read)
export function loadRecord() {
  const savedRecords = localStorage.getItem("dinner_records");
  if (savedRecords) {
    const allRecords = JSON.parse(savedRecords);
    return allRecords;
  }
}

//更新処理(Update)
export function updateRecord(allRecords: Record[], updatedRecord: Record) {
  const updatedAllRecords = allRecords.map((record) =>
    record.date === updatedRecord.date ? updatedRecord : record
  );
  localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
  return updatedAllRecords;
}

//削除処理(Delete)
export function deleteRecord(allRecords: Record[], globalIndex: number) {
  const updatedAllRecords = allRecords.filter((_, i) => i !== globalIndex);
  localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
  return updatedAllRecords;
}
