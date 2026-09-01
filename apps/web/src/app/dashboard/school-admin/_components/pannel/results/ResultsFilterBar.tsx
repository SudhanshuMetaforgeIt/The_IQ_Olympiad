"use client";

import { Search, ChevronDown, SlidersHorizontal, Download } from "lucide-react";

interface ResultsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedExam: string;
  setSelectedExam: (val: string) => void;
  selectedClass: string;
  setSelectedClass: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  onExport?: () => void;
}

export function ResultsFilterBar({
  searchTerm,
  setSearchTerm,
  selectedExam,
  setSelectedExam,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
  onExport,
}: ResultsFilterBarProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="relative w-full md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by student name or exam name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-body font-normal text-slate-800 placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
        />
      </div>

      {/* Right Dropdowns & Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        {/* All Exams Dropdown */}
        <div className="relative">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 py-2.5 pl-4 pr-9 rounded-full cursor-pointer hover:border-slate-300 focus:outline-none"
          >
            <option value="All Exams">All Exams</option>
            <option value="National Science Olympiad (NSO)">NSO</option>
            <option value="IMO Mathematics Olympiad">IMO</option>
            <option value="Cyber Olympiad">Cyber</option>
            <option value="English Olympiad">English</option>
            <option value="AI Olympiad">AI</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* All Classes Dropdown */}
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 py-2.5 pl-4 pr-9 rounded-full cursor-pointer hover:border-slate-300 focus:outline-none"
          >
            <option value="All Classes">All Classes</option>
            <option value="VII">Class VII</option>
            <option value="VIII">Class VIII</option>
            <option value="IX">Class IX</option>
            <option value="X">Class X</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* All Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 py-2.5 pl-4 pr-9 rounded-full cursor-pointer hover:border-slate-300 focus:outline-none"
          >
            <option value="All Status">All Status</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filters Button */}
        <button
          type="button"
          className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 px-4 py-2.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Filters</span>
        </button>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center space-x-2 border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-bold text-button px-5 py-2 rounded-full transition-all cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
