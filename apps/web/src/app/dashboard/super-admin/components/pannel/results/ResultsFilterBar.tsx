"use client";

import React, { useState } from "react";
import { Search, Calendar, SlidersHorizontal, Download, Send, BarChart2 } from "lucide-react";
import { ResultsFilterState } from "./types";
import { CalendarRangeModal } from "../../common/CalendarRangeModal";

interface ResultsFilterBarProps {
  filters: ResultsFilterState;
  isTotalStudentsView?: boolean;
  isRegisteredStudentsView?: boolean;
  isMeritListView?: boolean;
  isPublishedResultsView?: boolean;
  onFilterChange: (key: keyof ResultsFilterState, value: string) => void;
  onPublish: () => void;
  onExport: () => void;
}

export function ResultsFilterBar({
  filters,
  isTotalStudentsView = false,
  isRegisteredStudentsView = false,
  isMeritListView = false,
  isPublishedResultsView = false,
  onFilterChange,
  onPublish,
  onExport,
}: ResultsFilterBarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
      {/* Top Row: 5 Filter Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Select Olympiad */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
            Select Olympiad
          </label>
          <select
            value={filters.olympiad}
            onChange={(e) => onFilterChange("olympiad", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
          >
            <option value="All Olympiads">All Olympiads</option>
            <option value="IMO">IMO - Mathematics</option>
            <option value="NSO">NSO - Science</option>
            <option value="IEO">IEO - English</option>
            <option value="IGKO">IGKO - General Knowledge</option>
          </select>
        </div>

        {/* Select School */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
            Select School
          </label>
          <select
            value={filters.school}
            onChange={(e) => onFilterChange("school", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
          >
            <option value="All Schools">All Schools</option>
            <option value="Delhi Public School">Delhi Public School</option>
            <option value="St. Xavier's School">St. Xavier's School</option>
            <option value="Kendriya Vidyalaya">Kendriya Vidyalaya</option>
          </select>
        </div>

        {/* Select Class */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
            Select Class
          </label>
          <select
            value={filters.classNum}
            onChange={(e) => onFilterChange("classNum", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
          >
            <option value="All Classes">All Classes</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 8">Class 8</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
            {isMeritListView
              ? "Select Medal"
              : isRegisteredStudentsView
              ? "Registration Status"
              : "Result Status"}
          </label>
          <select
            value={isMeritListView ? filters.medal || "All Medals" : filters.status}
            onChange={(e) =>
              isMeritListView
                ? onFilterChange("medal", e.target.value)
                : onFilterChange("status", e.target.value)
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-600 bg-white"
          >
            {isMeritListView ? (
              <>
                <option value="All Medals">All Medals</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </>
            ) : isRegisteredStudentsView ? (
              <>
                <option value="Registered">Registered</option>
                <option value="Pending">Pending</option>
                <option value="All Status">All Status</option>
              </>
            ) : isTotalStudentsView ? (
              <>
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </>
            ) : (
              <>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </>
            )}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
            {isRegisteredStudentsView ? "Registration Date" : "Result Date"}
          </label>
          <div
            onClick={() => setIsCalendarOpen(true)}
            className="relative flex items-center cursor-pointer group"
          >
            <input
              type="text"
              readOnly
              value={filters.dateRange || "01 May 2026 - 12 May 2026"}
              className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200/90 text-xs font-bold text-slate-800 bg-white group-hover:border-purple-400 group-hover:bg-purple-50/20 cursor-pointer transition-colors focus:outline-none"
            />
            <Calendar className="w-4 h-4 text-purple-600 absolute right-3 cursor-pointer shrink-0 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      <CalendarRangeModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        currentRange={filters.dateRange}
        onApply={(val) => onFilterChange("dateRange", val)}
        title={isRegisteredStudentsView ? "Select Registration Date Range" : "Select Result Date Range"}
      />

      {/* Bottom Row: Search, Filters button & Action CTAs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 pt-1">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 max-w-md w-full focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/10 transition-all">
            <Search className="w-4 h-4 text-purple-600 shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
              placeholder={
                isPublishedResultsView
                  ? "Search by olympiad name, exam code..."
                  : "Search by student name, registration ID, roll number..."
              }
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-purple-700 font-extrabold text-xs hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-600" />
            <span>Filters</span>
          </button>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          {isPublishedResultsView ? (
            <>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-700 font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              >
                <BarChart2 className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                <span>View Result Summary</span>
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Export Results</span>
              </button>
            </>
          ) : isMeritListView ? (
            <>
              <button
                type="button"
                onClick={onPublish}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-700 font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                <span>Publish Merit List</span>
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Export Merit List</span>
              </button>
            </>
          ) : isRegisteredStudentsView || isTotalStudentsView ? (
            <>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-700 font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                <span>{isRegisteredStudentsView ? "Export Registered Students" : "Export Students"}</span>
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download List</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onPublish}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/60 text-purple-700 font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                <span>Publish Results</span>
              </button>
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Export Results</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
