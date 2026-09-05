"use client";

import React from "react";
import { Search, ChevronDown, Plus, GraduationCap, X } from "lucide-react";

interface StudentsFilterBarProps {
  selectedCard: string | null;
  onSelectCard: (id: string | null) => void;
  onClearCardFilter: () => void;
}

export function StudentsFilterBar({
  selectedCard,
  onSelectCard,
  onClearCardFilter,
}: StudentsFilterBarProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "Active") onSelectCard("active");
    else if (val === "Inactive") onSelectCard("inactive");
    else if (val === "Total") onSelectCard("total");
    else onSelectCard(null);
  };

  const getDropdownValue = () => {
    if (selectedCard === "active") return "Active";
    if (selectedCard === "inactive") return "Inactive";
    if (selectedCard === "total") return "Total";
    return "All Status";
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
      {/* Top Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-500">
            Select School
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer focus:outline-none hover:border-slate-300">
              <option>All Schools</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-500">
            Select Class
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer focus:outline-none hover:border-slate-300">
              <option>All Classes</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-500">
            Select Olympiad
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer focus:outline-none hover:border-slate-300">
              <option>All Olympiads</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-slate-500">
            Student Status
          </label>
          <div className="relative">
            <select
              value={getDropdownValue()}
              onChange={handleStatusChange}
              className="w-full appearance-none bg-white border border-slate-200/90 rounded-xl px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-bold text-slate-800 cursor-pointer focus:outline-none hover:border-slate-300"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Total">Total</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B1EAE] text-white text-xs sm:text-sm font-extrabold hover:bg-purple-800 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 w-full sm:flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Name, Registration ID or Roll Number..."
              className="w-full bg-white border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#3B1EAE] transition-colors"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B1EAE] text-white text-xs sm:text-sm font-extrabold hover:bg-purple-800 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-purple-300 opacity-80">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-purple-300" />
            ))}
          </div>
          <GraduationCap className="w-10 h-10 stroke-[1.2] text-[#3B1EAE]" />
        </div>
      </div>

      {/* Active Filter Tag Row */}
      {selectedCard && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Showing:</span>
            {selectedCard === "active" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-200 bg-emerald-100/80 text-emerald-700 text-xs font-bold">
                <span>Active Students</span>
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-emerald-900"
                  onClick={onClearCardFilter}
                />
              </span>
            )}
            {selectedCard === "total" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-purple-200 bg-purple-100/80 text-[#3B1EAE] text-xs font-bold">
                <span>Registered Students (All Time)</span>
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-purple-900"
                  onClick={onClearCardFilter}
                />
              </span>
            )}
            {selectedCard === "inactive" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-red-200 bg-red-100/80 text-red-700 text-xs font-bold">
                <span>Inactive Students</span>
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-900"
                  onClick={onClearCardFilter}
                />
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClearCardFilter}
            className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
          >
            <span>Clear all</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
