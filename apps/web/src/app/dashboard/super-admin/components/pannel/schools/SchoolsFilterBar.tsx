"use client";

import React from "react";
import { Search, Filter, ChevronDown, X } from "lucide-react";

interface SchoolsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onClearFilter: () => void;
}

export function SchoolsFilterBar({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onClearFilter,
}: SchoolsFilterBarProps) {
  const isFiltered = selectedFilter !== "all" || searchQuery.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full lg:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by school name, code, city or admin name..."
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#3B1EAE] transition-colors"
          />
        </div>

        {/* Filters Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-initial min-w-[130px]">
            <select className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer focus:outline-none hover:border-slate-300">
              <option>All States</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:flex-initial min-w-[130px]">
            <select className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer focus:outline-none hover:border-slate-300">
              <option>All Cities</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-purple-300 bg-purple-50/50 text-[#3B1EAE] text-xs sm:text-sm font-extrabold hover:bg-purple-100/50 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4 text-[#3B1EAE] stroke-[2.2]" />
            <span>Filters ({isFiltered ? "1" : "0"})</span>
          </button>

          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilter}
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Pill Badge */}
      {selectedFilter !== "all" && (
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-purple-200 bg-purple-50/80 text-[#3B1EAE] text-xs font-bold">
            <span>Status: {selectedFilter}</span>
            <X
              className="w-3 h-3 cursor-pointer hover:text-purple-900"
              onClick={onClearFilter}
            />
          </span>
        </div>
      )}
    </div>
  );
}
