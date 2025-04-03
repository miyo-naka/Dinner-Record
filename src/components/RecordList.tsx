import { Record } from "@/utils/recordUtils";
import React, { useEffect, useState } from "react";

type RecordListProps = {
  records: Record[];
  handleEdit: (record: Record) => void;
  handleDelete: (recordId: string) => void;
};

export default function RecordList({
  records,
  handleEdit,
  handleDelete,
}: RecordListProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 並び順を変更する関数
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // データを日付順に並べ替える関数
  const sortRecords = (records: any[], order: "asc" | "desc") => {
    return [...records].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };
  const sortedRecords = sortRecords(records, sortOrder);

  return (
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
        {sortedRecords.map((record, index) => (
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
                onClick={() => handleDelete(record.id)}
                className="m-1 sm:my-2 p-1 sm:p-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
              >
                削除
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
