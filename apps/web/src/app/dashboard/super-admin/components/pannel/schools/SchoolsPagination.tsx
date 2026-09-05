"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface SchoolsPaginationProps {
  count: number;
  total: number;
  filterLabel?: string;
}

export function SchoolsPagination({
  count,
  total,
  filterLabel,
}: SchoolsPaginationProps) {
  const labelText =
    filterLabel && filterLabel !== "all"
      ? `active schools`
      : `schools`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <p className="text-xs sm:text-sm font-bold text-slate-500">
        Showing 1 to {count} of {total} {labelText}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 cursor-not-allowed"
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-[#3B1EAE] text-white text-xs sm:text-sm font-black flex items-center justify-center shadow-xs"
        >
          1
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 cursor-not-allowed"
          disabled
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="relative inline-flex items-center ml-2">
          <select className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer focus:outline-none hover:border-slate-300">
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
            <option value="50">50 / page</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
