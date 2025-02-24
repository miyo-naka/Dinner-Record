"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditRecordForm from "@/components/EditRecordForm";

type Record = {
  id?: number;
  date: string;
  dishName: string;
  note: string;
};

export default function history() {
  // const [date, setDate] = useState("");
  // const [dishName, setDishName] = useState("");
  // const [note, setNote] = useState("");
  const [records, setRecords] = useState<Record[]>([]);
  const [editRecord, setEditRecord] = useState<Record | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 7;

  // レンダリング時にlocalStorageからデータを読み込む+ページネーション
  useEffect(() => {
    const savedRecords = localStorage.getItem("dinner_records");
    if (savedRecords) {
      const allRecords = JSON.parse(savedRecords);
      const totalPageNumber = Math.ceil(allRecords.length / recordsPerPage);
      setTotalPages(totalPageNumber);

      //現在のページデータのみ読み込む
      const startIndex = (page - 1) * recordsPerPage;
      const paginatedRecords = allRecords.slice(
        startIndex,
        startIndex + recordsPerPage
      );
      setRecords(paginatedRecords);
    }
  }, [page]);

  //編集モーダルを開く
  const handleEdit = (record: Record) => {
    setEditRecord(record);
  };
  //更新処理
  const handleUpdate = (updatedRecord: Record) => {
    const updatedRecords = records.map((record) =>
      record.date === updatedRecord.date ? updatedRecord : record
    );
    setRecords(updatedRecords); // 状態を更新
    localStorage.setItem("dinner_records", JSON.stringify(updatedRecords)); // localStorageにも保存
    setEditRecord(null); // 編集モードを終了
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />
      <h2 className="text-3xl font-bold my-8"> ごはんの記録</h2>
      {records.length === 0 ? (
        <p>記録がありません</p>
      ) : (
        <table className="w-[70%] mb-5">
          <thead>
            <tr className="[&>th]:h-10 text-left">
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
                className="[&>td]:h-8 p-4 text-left border-t-[1px] border-t-dotted border-violet-300"
              >
                <td>{record.date}</td>
                <td>{record.dishName}</td>
                <td>{record.note}</td>
                <td className="min-w-[10%]">
                  {/* <button onClick={() => handleEdit(record)}>編集</button> */}
                  <button
                    onClick={() => handleEdit(record)}
                    className="my-2 mx-1 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
                  >
                    編集
                  </button>
                </td>
                <td className="min-w-[10%]">
                  {/* <button onClick={() => handleDelete(record.id)}>削除</button> */}
                  <button className="my-2 mx-1 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200">
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
