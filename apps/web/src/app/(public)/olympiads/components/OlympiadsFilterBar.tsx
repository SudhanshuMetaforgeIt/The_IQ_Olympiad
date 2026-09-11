import React from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { OlympiadStatus, SubjectCategory } from "./types";

interface OlympiadsFilterBarProps {
  selectedClass: string;
  onClassChange: (cls: string) => void;
  selectedSubject: SubjectCategory;
  onSubjectChange: (sub: SubjectCategory) => void;
  selectedStatus: OlympiadStatus;
  onStatusChange: (status: OlympiadStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const STATUS_OPTIONS: OlympiadStatus[] = ["Upcoming", "Live", "Completed"];

const CLASS_OPTIONS = [
  "All Classes",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const SUBJECT_OPTIONS: SubjectCategory[] = [
  "All Subjects",
  "Mathematics",
  "Science",
  "English",
  "Reasoning",
  "AI",
];

export default function OlympiadsFilterBar({
  selectedClass,
  onClassChange,
  selectedSubject,
  onSubjectChange,
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: OlympiadsFilterBarProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-4 sm:px-6 sm:py-4 shadow-xs mb-8 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 xl:gap-8">
        {/* Left Side: Class & Subject Dropdowns */}
        <div className="flex flex-wrap items-end gap-3 sm:gap-5">
          {/* Class Dropdown */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Class
            </span>
            <div className="relative group">
              <select
                aria-label="Filter by class"
                value={selectedClass}
                onChange={(e) => onClassChange(e.target.value)}
                className="h-9 min-w-[120px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-bold text-slate-800 hover:border-purple-300 hover:bg-purple-50/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 cursor-pointer shadow-2xs"
              >
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Subject
            </span>
            <div className="relative group">
              <select
                aria-label="Filter by subject"
                value={selectedSubject}
                onChange={(e) =>
                  onSubjectChange(e.target.value as SubjectCategory)
                }
                className="h-9 min-w-[135px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-bold text-slate-800 hover:border-purple-300 hover:bg-purple-50/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 cursor-pointer shadow-2xs"
              >
                {SUBJECT_OPTIONS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>
        </div>

        {/* Right Side: Status Pills & Search Input */}
        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
          {/* Status Pills */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Status
            </span>
            <div className="flex items-center gap-1.5">
              {STATUS_OPTIONS.map((st) => {
                const isActive = selectedStatus === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => onStatusChange(st)}
                    className={`h-9 rounded-full px-3.5 sm:px-4 text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 text-white shadow-sm shadow-purple-600/30 ring-1 ring-purple-600/30"
                        : "bg-slate-100/90 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Olympiads Input */}
          <div className="relative w-full sm:w-64 xl:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search olympiads..."
              className="h-9 w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-9 pr-8 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

