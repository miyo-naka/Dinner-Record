export type Record = {
  date: string;
  dishName: string;
  note: string;
};

//データ取得
export function loadRecord() {
  const savedRecords = localStorage.getItem("dinner_records");
  if (savedRecords) {
    const allRecords = JSON.parse(savedRecords);
    return allRecords;
  }
}

//更新処理
export function updatedRecord(allRecords: Record[], updatedRecord: Record) {
  const updatedAllRecords = allRecords.map((record) =>
    record.date === updatedRecord.date ? updatedRecord : record
  );
  localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
  return updatedAllRecords;
}

//削除処理
export function deleteRecord(allRecords: Record[], globalIndex: number) {
  const updatedAllRecords = allRecords.filter((_, i) => i !== globalIndex);
  localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
  return updatedAllRecords;
}
