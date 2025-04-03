"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import EditRecordForm from "@/components/EditRecordForm";
import RecordCalendar from "@/components/RecordCalendar";
import RecordList from "@/components/RecordList";
import Pagination from "@/components/Pagination";
import {
  deleteRecord,
  loadRecords,
  Record,
  updateRecord,
} from "@/utils/recordUtils";

export default function history() {
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [paginatedRecords, setPaginatedRecords] = useState<Record[]>([]);
  const [editRecord, setEditRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  //データの取得(Firebase)
  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      const data = await loadRecords();
      setAllRecords(data);
      setIsLoading(false);
    };
    fetchRecords();
  }, []);

  //編集モーダルを開く
  const handleEdit = (record: Record) => {
    setEditRecord(record);
  };

  //更新処理(Firebase)
  const handleUpdate = async (updatedRecord: Record) => {
    try {
      await updateRecord(updatedRecord);
      alert("記録を更新しました");
      setEditRecord(null);
      const data = await loadRecords();
      setAllRecords(data);
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  //削除処理(Firebase)
  const handleDelete = async (recordId: string) => {
    const recordToDelete = allRecords.find((r) => r.id === recordId);
    if (!recordToDelete) return;
    const isConfirmed = confirm(
      `削除してもいいですか？料理名：${recordToDelete.dishName}`
    );
    if (!isConfirmed) return;
    else {
      try {
        await deleteRecord(recordId);
        alert("記録を削除しました");
        const data = await loadRecords();
        setAllRecords(data);
      } catch (error) {
        console.error("削除エラー:", error);
      }
    }
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />

      <h2 className="mt-20 my-8"> ごはんの記録</h2>

      {/* 表示切り替え */}
      <button
        onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
        className="mb-4 py-2 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
      >
        {viewMode === "list"
          ? "カレンダー表示に切り替え"
          : "リスト表示に切り替え"}
      </button>

      {isLoading ? (
        <p>読み込み中…</p>
      ) : paginatedRecords.length === 0 ? (
        <p>記録がありません</p>
      ) : viewMode === "list" ? (
        <RecordList
          records={paginatedRecords}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <RecordCalendar records={allRecords} />
      )}

      {/* 編集フォーム（EditRecordForm）を表示 */}
      {editRecord && (
        <EditRecordForm
          editRecord={editRecord}
          setEditRecord={setEditRecord}
          handleUpdate={handleUpdate}
        />
      )}

      {/* ページネーション */}
      {viewMode === "list" && (
        <Pagination records={allRecords} onPageChange={setPaginatedRecords} />
      )}

      <Link href="/">
        <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
          ホームに戻る
        </button>
      </Link>
    </div>
  );
}
