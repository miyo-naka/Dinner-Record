export type Record = {
  date: string;
  dishName: string;
  note: string;
};

//登録処理(Create)
export function createRecord(newRecord: Record) {
  const records = loadRecords();
  const updatedRecords = [...records, newRecord];
  localStorage.setItem("dinner_records", JSON.stringify(updatedRecords));
  return updatedRecords;
}

//データ取得(Read)
export function loadRecords() {
  const savedRecords = localStorage.getItem("dinner_records");
  if (savedRecords) {
    const allRecords = JSON.parse(savedRecords);
    return allRecords;
  } else {
    return [];
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
