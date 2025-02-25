"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function record() {
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

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !dishName) {
      alert("日付と料理名は必須です");
      return;
    }

    const newRecord = { date, dishName, note };
    const updatedRecords = [...records, newRecord];

    localStorage.setItem("dinner_records", JSON.stringify(updatedRecords));
    setRecords(updatedRecords);

    setDate("");
    setDishName("");
    setNote("");
    alert("ごはんを記録しました");
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />
      <h2 className="mt-20 my-8"> ごはんを記録する</h2>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-[500px]">
        <label className="flex justify-between items-center gap-4 my-1">
          日付
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="ml-4 p-2 border rounded-lg  w-3/4"
          />
        </label>
        <label className="flex justify-between items-center gap-4 my-1">
          料理名
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
            className="p-2 border rounded-lg  w-3/4"
          />
        </label>
        <label className="flex justify-between items-center gap-4 my-1">
          メモ
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 border rounded-lg  w-3/4"
          />
        </label>
        <button
          type="submit"
          className=" mt-2 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          記録する
        </button>
      </form>
      <Link href="/">
        <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
          ホームに戻る
        </button>
      </Link>
    </div>
  );
}
