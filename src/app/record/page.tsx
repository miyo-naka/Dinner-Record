"use client";
import Header from "@/components/Header";
import { createRecord } from "@/utils/recordUtils";
import Link from "next/link";
import React, { useState } from "react";

export default function record() {
  const [date, setDate] = useState("");
  const [dishName, setDishName] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !dishName) {
      alert("日付と料理名は必須です");
      return;
    } else {
      const newRecord = { date, dishName, note, category };
      createRecord(newRecord);

      setDate("");
      setDishName("");
      setNote("");
      setCategory("");
      alert("ごはんを記録しました");
    }
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
          ジャンル
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border rounded-lg  w-3/4"
          >
            <option value="和食">和食</option>
            <option value="洋食">洋食</option>
            <option value="中華">中華</option>
            <option value="その他">その他</option>
          </select>
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
