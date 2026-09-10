"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface StudentsPaginationProps {
  selectedCard: string | null;
}

export function StudentsPagination({ selectedCard }: StudentsPaginationProps) {
  const isActiveView = selectedCard === "active";
  const isTotalView = selectedCard === "total";
  const isFilteredView = Boolean(selectedCard);

  const getShowingText = () => {
    if (isActiveView) return "Showing 1 to 10 of 1,156 active students";
    if (isTotalView) return "Showing 1 to 7 of 1,248 registered students";
    if (selectedCard === "inactive") return "Showing 1 to 10 of 92 inactive students";
    return "Showing 1 to 7 of 7 schools";
  };

  const getPagesCount = () => {
    if (isActiveView) return 116;
    if (isTotalView) return 178;
    if (selectedCard === "inactive") return 10;
    return 1;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <p className="text-xs sm:text-sm font-bold text-[#3B1EAE]">
        {getShowingText()}
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
          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-slate-50"
        >
          2
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-slate-50"
        >
          3
        </button>
        {isFilteredView && (
          <>
            <span className="text-slate-400 font-bold text-xs">...</span>
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-slate-50"
            >
              {getPagesCount()}
            </button>
          </>
        )}
        <button
          type="button"
          className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50"
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
