"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CertificatesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function CertificatesPagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}: CertificatesPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-semibold text-slate-500">
      <div>
        Showing <span className="font-bold text-slate-800">1</span> to{" "}
        <span className="font-bold text-slate-800">{Math.min(10, totalResults)}</span> of{" "}
        <span className="font-bold text-slate-800">{totalResults}</span> entries
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs">
          {currentPage}
        </span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
