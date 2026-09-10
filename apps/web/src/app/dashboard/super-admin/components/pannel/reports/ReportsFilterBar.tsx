"use client";

import React, { useState } from "react";
import { Filter, Download, ChevronDown, Calendar } from "lucide-react";
import { ReportsFilterState } from "./types";
import { CalendarRangeModal } from "../../common/CalendarRangeModal";

interface ReportsFilterBarProps {
  filters: ReportsFilterState;
  onFilterChange: (key: keyof ReportsFilterState, value: string) => void;
}

export default function ReportsFilterBar({
  filters,
  onFilterChange,
}: ReportsFilterBarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Dropdowns */}
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
                <option value="IEO">IEO - English</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select School */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select School
            </label>
            <div className="relative">
              <select
                value={filters.school}
                onChange={(e) => onFilterChange("school", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All">All Schools</option>
                <option value="DPS">Delhi Public School</option>
                <option value="St. Xavier">St. Xavier's School</option>
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
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Date Range */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select Date Range
            </label>
            <div
              onClick={() => setIsCalendarOpen(true)}
              className="relative flex items-center bg-slate-50 hover:bg-purple-50/60 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 justify-between cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>{filters.dateRange || "01 May 2026 - 12 May 2026"}</span>
              </div>
            </div>
          </div>
        </div>

        <CalendarRangeModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          currentRange={filters.dateRange}
          onApply={(val) => onFilterChange("dateRange", val)}
          title="Select Report Date Range"
        />

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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
