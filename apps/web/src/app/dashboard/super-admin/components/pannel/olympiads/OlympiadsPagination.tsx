"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OlympiadsPaginationProps {
  currentPage: number;
  totalPages: number;
  showingFrom: number;
  showingTo: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function OlympiadsPagination({
  currentPage,
  totalPages,
  showingFrom,
  showingTo,
  totalItems,
  onPageChange,
}: OlympiadsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      {/* Showing count text */}
      <span className="text-xs sm:text-sm font-bold text-slate-500">
        Showing {showingFrom} to {showingTo} of {totalItems} olympiads
      </span>

      {/* Pagination page controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {pages.map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
