import React, { useEffect, useState } from "react";
import { Record } from "@/utils/recordUtils";

type PaginationProps = {
  records: Record[]; // 外部からデータを受け取る
  onPageChange: (paginatedRecords: Record[]) => void; // ページ変更時にデータを渡す
};

export default function Pagination({ records, onPageChange }: PaginationProps) {
  const [page, setPage] = useState(1);
  const recordsPerPage = 7;
  const totalPages = Math.ceil(records.length / recordsPerPage);

  //ページネーション用のデータの更新
  useEffect(() => {
    const paginated = records.slice(
      (page - 1) * recordsPerPage,
      page * recordsPerPage
    );
    onPageChange(paginated);
  }, [records, page, onPageChange]);

  return (
    <>
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
    </>
  );
}
