import React, { useEffect, useState } from "react";
import { Record } from "@/utils/recordUtils";

type PaginationProps = {
  totalRecords: number;
  recordsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  totalRecords,
  recordsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  return (
    <>
      {/* ページネーション */}
      {totalPages > 1 && (
        <div>
          <button
            hidden={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="my-2 mx-3 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPages} ページ
          </span>
          <button
            hidden={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="my-2 mx-3 py-3 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
