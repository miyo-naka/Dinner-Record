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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function history() {
  const [records, setRecords] = useState<Record[]>([]);
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [paginatedRecords, setPaginatedRecords] = useState<Record[]>([]);
  const [editRecord, setEditRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const [page, setPage] = useState(1);
  const recordsPerPage = 7;

  const events = allRecords.map((record) => ({
    title: record.dishName,  // 料理名
    start: record.date,       // 記録の日付
    allDay: true,             // 終日イベントとして表示
  }));

  //データの取得(Firebase)
  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      const data = await loadRecords();
      setAllRecords(sortRecords(data, sortOrder));
      setIsLoading(false);
    };
    fetchRecords();
  }, [sortOrder]);

  // 並び順を変更する関数
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //ページネーション用のデータの更新
  useEffect(() => {
    setPaginatedRecords(
      allRecords.slice((page - 1) * recordsPerPage, page * recordsPerPage)
    );
  }, [allRecords, page]);
  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  // データを日付順に並べ替える関数
  const sortRecords = (records: any[], order: "asc" | "desc") => {
    return [...records].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

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
      <button
          onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
        className="mb-4 py-2 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          {viewMode === "list" ? "カレンダー表示に切り替え" : "リスト表示に切り替え"}
      </button>

      {isLoading ? (
        <p>読み込み中…</p>
      ) : paginatedRecords.length === 0 ? (
        <p>記録がありません</p>
      ) : viewMode === "list" ? (
        <table className="w-[95%] sm:w-[70%] mb-5">
          <thead>
            <tr className="[&>th]:sm:h-10 text-left">
              <th>
                日付
                <button onClick={toggleSortOrder}>
                  {sortOrder === "asc" ? "　▲" : "　▼"}
                </button>
              </th>
              <th>料理名</th>
              <th>メモ</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record, index) => (
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
          ) : (
          <div className="w-full min-w-[300px] sm:w-[70%]">
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            aspectRatio={window.innerWidth > 640 ? 1.35 : 0.8}
            eventContent={(eventInfo) => (
              <div className="text-[10px] sm:text-sm break-words whitespace-normal bg-blue-100 text-blue-800 rounded p-1 w-full">
                {eventInfo.event.title}
              </div>
            )}
          /></div>
      )}

      {/* ページネーション */}
      {viewMode === "list" ?(
      totalPages > 1 && (
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
      )):""}

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
