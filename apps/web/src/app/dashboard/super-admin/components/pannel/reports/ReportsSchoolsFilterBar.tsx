"use client";

import React from "react";
import { Filter, RotateCcw, ChevronDown } from "lucide-react";
import { ReportsFilterState } from "./types";

interface ReportsSchoolsFilterBarProps {
  filters: ReportsFilterState;
  onFilterChange: (key: keyof ReportsFilterState, value: string) => void;
  onResetFilters: () => void;
}

export default function ReportsSchoolsFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
}: ReportsSchoolsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
          {/* Select Olympiad */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select Olympiad
            </label>
            <div className="relative">
              <select
                value={filters.olympiad}
                onChange={(e) => onFilterChange("olympiad", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All">All Olympiads</option>
                <option value="IMO">IMO - Mathematics</option>
                <option value="NSO">NSO - Science</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Class */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select Class
            </label>
            <div className="relative">
              <select
                value={filters.classNum}
                onChange={(e) => onFilterChange("classNum", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All">All Classes</option>
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select City */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select City
            </label>
            <div className="relative">
              <select
                value={filters.city || "All"}
                onChange={(e) => onFilterChange("city", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select State */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select State
            </label>
            <div className="relative">
              <select
                value={filters.state || "All"}
                onChange={(e) => onFilterChange("state", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All">All States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi">Delhi</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end pt-3 lg:pt-0">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-purple-700 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4 text-purple-600" />
            <span>More Filters</span>
          </button>

          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-purple-700 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-purple-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
