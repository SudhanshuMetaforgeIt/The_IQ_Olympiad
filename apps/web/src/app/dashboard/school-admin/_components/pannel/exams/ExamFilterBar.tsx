"use client";

import { Search, Plus } from "lucide-react";

interface ExamFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onAddExam?: () => void;
}

export function ExamFilterBar({
  searchTerm,
  setSearchTerm,
  onAddExam,
}: ExamFilterBarProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="relative w-full md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search exam name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-body font-normal text-slate-800 placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
        />
      </div>

      {/* Add Exam Button */}
      <button
        type="button"
        onClick={onAddExam}
        className="inline-flex items-center space-x-2 bg-[#6B46C1] hover:bg-purple-800 text-white font-bold text-button px-6 py-2.5 rounded-full shadow-md shadow-purple-600/20 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Exam</span>
      </button>
    </div>
  );
}
