"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditRecordForm from "@/components/EditRecordForm";
import {
  deleteRecord,
  loadRecords,
  Record,
  updateRecord,
} from "@/utils/recordUtils";

export default function history() {
  const [records, setRecords] = useState<Record[]>([]);
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [editRecord, setEditRecord] = useState<Record | null>(null);

  const [page, setPage] = useState(1);
  const recordsPerPage = 7;

  //データの取得(local)
  // useEffect(() => {
  //   setAllRecords(loadRecords());
  // }, []);

  //データの取得(Firebase)
  useEffect(() => {
    const fetchRecords = async () => {
      const data = await loadRecords();
      setAllRecords(data);
    };
    fetchRecords();
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
  //更新処理(local)
  // const handleUpdate = (updatedRecord: Record) => {
  //   setAllRecords(updateRecord(allRecords, updatedRecord));
  //   alert("記録を更新しました");
  //   setEditRecord(null); // 編集モードを終了
  // };

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

  //削除処理(local)
  // const handleDelete = (index: number) => {
  //   const globalIndex = (page - 1) * recordsPerPage + index;
  //   const recordToDelete = allRecords[globalIndex];
  //   const isConfirmed = confirm(
  //     `削除してもいいですか？料理名：${recordToDelete.dishName}`
  //   );
  //   if (!isConfirmed) {
  //     return;
  //   } else {
  //     setAllRecords(deleteRecord(allRecords, globalIndex));
  //     alert("記録を削除しました");
  //   }
  // };

  //削除処理(Firebase)
  const handleDelete = async (index: number) => {
    const globalIndex = (page - 1) * recordsPerPage + index;
    const recordToDelete = allRecords[globalIndex];
    if (!recordToDelete.id) return;
    const isConfirmed = confirm(
      `削除してもいいですか？料理名：${recordToDelete.dishName}`
    );
    if (!isConfirmed) return;
    else {
      try {
        await deleteRecord(recordToDelete.id);
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

      {/* ページネーション */}
      {totalPages > 1 && (
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
      )}

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
