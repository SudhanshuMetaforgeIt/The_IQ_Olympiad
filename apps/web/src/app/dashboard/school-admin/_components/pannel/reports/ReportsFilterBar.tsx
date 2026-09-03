"use client";

import React, { useState } from "react";
import { Search, Download, ChevronDown, FileText, FileSpreadsheet } from "lucide-react";
import { ReportFilterState } from "./types";

interface ReportsFilterBarProps {
  filters: ReportFilterState;
  onFilterChange: (key: keyof ReportFilterState, value: string) => void;
  onExport: (format: "pdf" | "excel" | "csv") => void;
}

export const ReportsFilterBar: React.FC<ReportsFilterBarProps> = ({
  filters,
  onFilterChange,
  onExport,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const availableClasses = [7, 8, 9, 10, 11, 12];

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4">
      {/* 3 Filters: Olympiad, Class, Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
        {/* Select Olympiad */}
        <div className="space-y-1.5">
          <label className="text-sm sm:text-base font-black text-slate-900">Select Olympiad</label>
          <div className="relative">
            <select
              value={filters.olympiad}
              onChange={(e) => onFilterChange("olympiad", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200/90 text-slate-900 text-base font-extrabold rounded-2xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-2xs"
            >
              <option value="all">All Olympiads</option>
              <option value="nso">NSO (Science)</option>
              <option value="imo">IMO (Mathematics)</option>
            </select>
            <ChevronDown className="w-5 h-5 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
        </div>

        {/* Select Class (Classes 7 to 12) */}
        <div className="space-y-1.5">
          <label className="text-sm sm:text-base font-black text-slate-900">Select Class</label>
          <div className="relative">
            <select
              value={filters.class}
              onChange={(e) => onFilterChange("class", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200/90 text-slate-900 text-base font-extrabold rounded-2xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-2xs"
            >
              <option value="all">All Classes</option>
              {availableClasses.map((cls) => (
                <option key={cls} value={`class-${cls}`}>
                  Class {cls}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
        </div>

        {/* Select Section */}
        <div className="space-y-1.5">
          <label className="text-sm sm:text-base font-black text-slate-900">Select Section</label>
          <div className="relative">
            <select
              value={filters.section}
              onChange={(e) => onFilterChange("section", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200/90 text-slate-900 text-base font-extrabold rounded-2xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-2xs"
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
            <ChevronDown className="w-5 h-5 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Right Controls: Search & Export */}
      <div className="flex items-center gap-3.5 flex-shrink-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reports"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full bg-white border border-slate-200/90 text-slate-900 text-base font-bold rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-2xs placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="px-6 py-3 rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-base flex items-center gap-3 shadow-xs transition cursor-pointer"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            <span>Export Report</span>
            <div className="border-l border-purple-400/40 pl-2 ml-1">
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </div>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2">
              <button
                onClick={() => {
                  onExport("pdf");
                  setShowExportMenu(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5"
              >
                <FileText className="w-5 h-5 text-rose-500" />
                Export as PDF
              </button>
              <button
                onClick={() => {
                  onExport("excel");
                  setShowExportMenu(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                Export as Excel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
