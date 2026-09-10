"use client";

import React from "react";
import { Search, Download, X } from "lucide-react";

interface OlympiadsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onClearFilter: () => void;
  onExport: () => void;
}

export function OlympiadsFilterBar({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onClearFilter,
  onExport,
}: OlympiadsFilterBarProps) {
  const isFilterActive = selectedFilter !== "all" || Boolean(searchQuery);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Left Group: Search Bar & Active Status Badge */}
      <div className="flex items-center gap-3 flex-wrap flex-1">
        <div className="flex items-center gap-3 bg-white border border-slate-200/90 rounded-2xl px-4 py-3 shadow-2xs w-full max-w-md focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all">
          <Search className="w-4 h-4 text-purple-600 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by olympiad name or code..."
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Status Badge Pill (e.g. Status: Completed X) */}
        {selectedFilter !== "all" && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-100/80 text-purple-700 text-xs font-extrabold shadow-2xs">
              <span>Status: {selectedFilter}</span>
              <button
                type="button"
                onClick={onClearFilter}
                className="hover:text-purple-900 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </span>

            <button
              type="button"
              onClick={onClearFilter}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 hover:underline transition-colors cursor-pointer ml-1"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Right Export Button */}
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-extrabold text-xs sm:text-sm hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0 self-start sm:self-auto"
      >
        <Download className="w-4 h-4 text-purple-600 stroke-[2.2]" />
        <span>Export</span>
      </button>
    </div>
  );
}
