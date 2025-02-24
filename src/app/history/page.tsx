"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function history() {
  const [date, setDate] = useState("");
  const [dishName, setDishName] = useState("");
  const [note, setNote] = useState("");
  const [records, setRecords] = useState<
    { date: string; dishName: string; note: string }[]
  >([]);

  // 初回レンダリング時に localStorage からデータを読み込む
  useEffect(() => {
    const savedRecords = localStorage.getItem("dinner_records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />
      <h2 className="text-3xl font-bold my-8"> ごはんの記録</h2>
      {records.length === 0 ? (
        <p>記録がありません</p>
      ) : (
        <table className="w-[60%] mb-5">
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
                className="[&>td]:h-8 p-2 text-left border-t-[1px] border-t-dotted border-violet-300"
              >
                <td>{record.date}</td>
                <td>{record.dishName}</td>
                <td>{record.note}</td>
                <td className="min-w-[10%]">
                  {/* <button onClick={() => handleEdit(record)}>編集</button> */}
                  <button className="my-2 mx-1 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200">
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
      <Link href="/">
        <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
          戻る
        </button>
      </Link>
    </div>
  );
}
