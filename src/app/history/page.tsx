"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditRecordForm from "@/components/EditRecordForm";
import record from "../record/page";

export type Record = {
  date: string;
  dishName: string;
  note: string;
};

export default function history() {
  const [records, setRecords] = useState<Record[]>([]);
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [editRecord, setEditRecord] = useState<Record | null>(null);

  const [page, setPage] = useState(1);
  const recordsPerPage = 7;

  // localStorageからデータを読み込み
  useEffect(() => {
    const savedRecords = localStorage.getItem("dinner_records");
    if (savedRecords) {
      const allRecords = JSON.parse(savedRecords);
      setAllRecords(allRecords);
    }
  }, []);

  //ページネーション用のデータの更新
  useEffect(() => {
    setRecords(
      allRecords.slice((page - 1) * recordsPerPage, page * recordsPerPage)
    );
  }, [allRecords, page]);
  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  //編集モーダルを開く
  const handleEdit = (record: Record) => {
    setEditRecord(record);
  };
  //更新処理
  const handleUpdate = (updatedRecord: Record) => {
    const updatedAllRecords = allRecords.map((record) =>
      record.date === updatedRecord.date ? updatedRecord : record
    );
    setAllRecords(updatedAllRecords);
    localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
    alert("記録を更新しました");
    setEditRecord(null); // 編集モードを終了
  };

  //削除処理
  const handleDelete = (index: number) => {
    const globalIndex = (page - 1) * recordsPerPage + index;
    const updatedAllRecords = allRecords.filter((_, i) => i !== globalIndex);
    setAllRecords(updatedAllRecords);
    localStorage.setItem("dinner_records", JSON.stringify(updatedAllRecords));
    alert("記録を削除しました");
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />
      <h2 className="mt-20 my-8"> ごはんの記録</h2>
      {records.length === 0 ? (
        <p>記録がありません</p>
      ) : (
        <table className="w-[95%] sm:w-[70%] mb-5">
          <thead>
            <tr className="[&>th]:sm:h-10 text-left">
              <th>日付</th>
              <th>料理名</th>
              <th>メモ</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="text-sm sm:text-base [&>td]:sm:h-8 p-4 text-left border-t-[1px] border-t-dotted border-violet-300"
              >
                <td>{record.date}</td>
                <td>{record.dishName}</td>
                <td>{record.note}</td>
                <td className="min-w-[10%]">
                  <button
                    onClick={() => handleEdit(record)}
                    className="m-1 sm:my-2 p-1 sm:p-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
                  >
                    編集
                  </button>
                </td>
                <td className="min-w-[10%]">
                  <button
                    onClick={() => handleDelete(index)}
                    className="m-1 sm:my-2 p-1 sm:p-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button
          hidden={page === 1}
          onClick={() => setPage(page - 1)}
          className="my-2 mx-3 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          Prev
        </button>
        <span>
          {page} / {totalPages} ページ
        </span>
        <button
          hidden={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="my-2 mx-3 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
      <Link href="/">
        <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
          ホームに戻る
        </button>
      </Link>

      {/* 編集フォーム（EditRecordForm）を表示 */}
      {editRecord && (
        <EditRecordForm
          editRecord={editRecord}
          setEditRecord={setEditRecord}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
