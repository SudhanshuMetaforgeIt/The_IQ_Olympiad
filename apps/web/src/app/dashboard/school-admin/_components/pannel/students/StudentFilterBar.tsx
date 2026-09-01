"use client";

import { Search, ChevronDown, Plus } from "lucide-react";

interface StudentFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedClass: string;
  setSelectedClass: (val: string) => void;
  selectedSection: string;
  setSelectedSection: (val: string) => void;
  onAddStudent: () => void;
}

export function StudentFilterBar({
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection,
  onAddStudent,
}: StudentFilterBarProps) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input Bar */}
      <div className="relative w-full md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, roll number or admission no."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-body font-normal text-slate-800 placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
        />
      </div>

      {/* Right Dropdowns & Add Student Button */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        {/* Class Filter */}
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 py-2.5 pl-4 pr-9 rounded-full cursor-pointer hover:border-slate-300 focus:outline-none"
          >
            <option value="All Classes">All Classes</option>
            <option value="V">Class V</option>
            <option value="VI">Class VI</option>
            <option value="VII">Class VII</option>
            <option value="VIII">Class VIII</option>
            <option value="IX">Class IX</option>
            <option value="X">Class X</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Section Filter */}
        <div className="relative">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-menu font-bold text-slate-700 py-2.5 pl-4 pr-9 rounded-full cursor-pointer hover:border-slate-300 focus:outline-none"
          >
            <option value="All Sections">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Add Student Button */}
        <button
          onClick={onAddStudent}
          className="inline-flex items-center space-x-2 bg-[#6B46C1] hover:bg-purple-800 text-white font-bold text-button px-5 py-2.5 rounded-full shadow-md shadow-purple-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Student</span>
        </button>
      </div>
    </div>
  );
}
