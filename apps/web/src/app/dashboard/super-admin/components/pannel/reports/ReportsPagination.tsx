"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ReportsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function ReportsPagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}: ReportsPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs font-semibold text-slate-400">
      <div>Showing 1 to 10 of 24 reports</div>

      <div className="flex items-center gap-3">
        {/* Page Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
          >
            3
          </button>
          <span className="px-2 text-slate-400 font-bold">...</span>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
          >
            20
          </button>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Per Page Select Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none cursor-pointer">
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
            <option value="50">50 / page</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
