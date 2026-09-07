"use client";

import React from "react";
import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { ReportsFilterState } from "./types";

interface ReportsTestsFilterBarProps {
  filters: ReportsFilterState;
  onFilterChange: (key: keyof ReportsFilterState, value: string) => void;
  onResetFilters: () => void;
}

export default function ReportsTestsFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
}: ReportsTestsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3 items-end">
        {/* Select Olympiad */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
            Select Olympiad
          </label>
          <div className="relative">
            <select
              value={filters.olympiad}
              onChange={(e) => onFilterChange("olympiad", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs"
            >
              <option value="All">All Olympiads</option>
              <option value="IMO">IMO - Mathematics</option>
              <option value="NSO">NSO - Science</option>
              <option value="IEO">IEO - English</option>
              <option value="IGKO">IGKO - GK</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select Class */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
            Select Class
          </label>
          <div className="relative">
            <select
              value={filters.classNum}
              onChange={(e) => onFilterChange("classNum", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs"
            >
              <option value="All">All Classes</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select City */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
            Select City
          </label>
          <div className="relative">
            <select
              value={filters.city || "All"}
              onChange={(e) => onFilterChange("city", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs"
            >
              <option value="All">All Cities</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select State */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
            Select State
          </label>
          <div className="relative">
            <select
              value={filters.state || "All"}
              onChange={(e) => onFilterChange("state", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer shadow-2xs"
            >
              <option value="All">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* More Filters */}
        <div>
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 bg-purple-50/70 border border-purple-200 text-purple-700 hover:bg-purple-100/70 text-xs font-bold rounded-xl py-2.5 px-4 transition-colors cursor-pointer shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5 text-purple-600" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Reset */}
        <div>
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full flex items-center justify-center space-x-1.5 bg-white border border-slate-200 text-purple-700 hover:bg-slate-50 text-xs font-bold rounded-xl py-2.5 px-4 transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
