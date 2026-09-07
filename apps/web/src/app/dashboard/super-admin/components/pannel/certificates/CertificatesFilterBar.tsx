"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Mail, Upload, ChevronDown, Calendar } from "lucide-react";
import { CertificatesFilterState, CertificatesViewMode } from "./types";
import { CalendarRangeModal } from "../../common/CalendarRangeModal";

interface CertificatesFilterBarProps {
  filters: CertificatesFilterState;
  viewMode: CertificatesViewMode;
  onFilterChange: (key: keyof CertificatesFilterState, value: string) => void;
  onDownload?: () => void;
  onExport?: () => void;
}

export default function CertificatesFilterBar({
  filters,
  viewMode,
  onFilterChange,
  onDownload,
  onExport,
}: CertificatesFilterBarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const isTotalView = viewMode === "total";
  const isPendingView = viewMode === "pending";
  const is5DropdownView = viewMode === "merit" || viewMode === "participation" || isPendingView;

  const handleDownloadAction = () => {
    if (onDownload) onDownload();
    else if (onExport) onExport();
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
      {/* Dropdowns Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isTotalView
            ? "lg:grid-cols-6"
            : is5DropdownView
            ? "lg:grid-cols-5"
            : "lg:grid-cols-4"
        } gap-3`}
      >
        {/* Select Olympiad */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Olympiad</label>
          <div className="relative">
            <select
              value={filters.olympiad}
              onChange={(e) => onFilterChange("olympiad", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Olympiads</option>
              <option value="IMO">IMO - Mathematics</option>
              <option value="NSO">NSO - Science</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select School */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select School</label>
          <div className="relative">
            <select
              value={filters.school}
              onChange={(e) => onFilterChange("school", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Schools</option>
              <option value="St. Xavier">St. Xavier High School</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select Class */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Class</label>
          <div className="relative">
            <select
              value={filters.classNum}
              onChange={(e) => onFilterChange("classNum", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Classes</option>
              <option value="10">Class 10</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Certificate Type */}
        {(isTotalView || is5DropdownView) && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Certificate Type</label>
            <div className="relative">
              <select
                value={filters.certificateTypeFilter || (isTotalView ? "All Types" : "Merit Certificates")}
                onChange={(e) => onFilterChange("certificateTypeFilter", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All Types">All Types</option>
                <option value="Merit Certificates">Merit Certificates</option>
                <option value="Participation Certificates">Participation Certificates</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Certificate Category (for Total View) */}
        {isTotalView && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Certificate Category</label>
            <div className="relative">
              <select
                value={filters.categoryFilter || "All Categories"}
                onChange={(e) => onFilterChange("categoryFilter", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Merit">Merit</option>
                <option value="Participation">Participation</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Date Range (for Total View) or Status */}
        {isTotalView ? (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date Range</label>
            <div
              onClick={() => setIsCalendarOpen(true)}
              className="relative flex items-center bg-slate-50 hover:bg-purple-50/60 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 justify-between cursor-pointer transition-colors group"
            >
              <span>{filters.dateRange || "01 May 2026 - 12 May 2026"}</span>
              <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 pr-7 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="Issued">Issued</option>
                <option value="Pending">Pending</option>
                <option value="All">All Status</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      <CalendarRangeModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        currentRange={filters.dateRange}
        onApply={(val) => onFilterChange("dateRange", val)}
        title="Select Certificate Date Range"
      />

      {/* Search and Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
              placeholder="Search by student name, registration ID, roll number..."
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
            />
          </div>
          <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
            <Filter className="w-4 h-4 text-purple-600" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {isPendingView ? (
            <>
              <button
                type="button"
                onClick={handleDownloadAction}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-purple-700 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-600" />
                <span>Download Pending List</span>
              </button>
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>Send Reminder</span>
              </button>
            </>
          ) : (
            <>
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-purple-600" />
                <span>Import</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadAction}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Certificates</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
