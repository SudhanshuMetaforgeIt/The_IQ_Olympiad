"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Calendar as CalendarIcon, Download, X, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface ExamRegistrationFiltersProps {
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

export function ExamRegistrationFilters({
  searchTerm,
  setSearchTerm,
  selectedExam,
  setSelectedExam,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
  onExport,
}: ExamRegistrationFiltersProps) {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState<string>("Select Date Range");
  const [startDate, setStartDate] = useState<number | null>(14);
  const [endDate, setEndDate] = useState<number | null>(18);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day); setEndDate(null);
    } else if (startDate && !endDate) {
      if (day < startDate) setStartDate(day);
      else setEndDate(day);
    }
  };

  const applyDateRange = () => {
    if (startDate && endDate) setSelectedRange(`${startDate} May - ${endDate} May 2024`);
    else if (startDate) setSelectedRange(`${startDate} May 2024`);
    else setSelectedRange("Select Date Range");
    setShowCalendarModal(false);
  };

  const resetDateRange = (e: React.MouseEvent) => {
    e.stopPropagation(); setStartDate(null); setEndDate(null); setSelectedRange("Select Date Range");
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2]" />
          <input type="text" placeholder="Search by student name or roll number" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm font-normal text-slate-800 placeholder:text-slate-400 pl-11 pr-4 py-3 rounded-full focus:outline-none" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative">
            <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 py-3 pl-4 pr-10 rounded-full cursor-pointer focus:outline-none">
              <option value="All Exams">All Exams</option><option value="National Science Olympiad (NSO)">NSO</option><option value="IMO Mathematics Olympiad">IMO</option><option value="Cyber Olympiad">Cyber</option><option value="English Olympiad">English</option><option value="AI Olympiad">AI Olympiad</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 py-3 pl-4 pr-10 rounded-full cursor-pointer focus:outline-none">
              <option value="All Classes">All Classes</option><option value="VI">Class VI</option><option value="VII">Class VII</option><option value="VIII">Class VIII</option><option value="IX">Class IX</option><option value="X">Class X</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 py-3 pl-4 pr-10 rounded-full cursor-pointer focus:outline-none">
              <option value="All Status">All Status</option><option value="Registered">Registered</option><option value="Pending">Pending</option><option value="Closed">Closed</option><option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button type="button" onClick={() => setShowCalendarModal(true)} className={`inline-flex items-center space-x-2 border text-sm font-semibold px-4 py-3 rounded-full transition-all cursor-pointer ${selectedRange !== "Select Date Range" ? "bg-purple-100/80 border-purple-300 text-purple-900" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`}>
            <CalendarIcon className="w-4 h-4 text-purple-600" /><span>{selectedRange}</span>
            {selectedRange !== "Select Date Range" && <X onClick={resetDateRange} className="w-4 h-4 text-purple-700 hover:bg-purple-200 rounded-full p-0.5 ml-1" />}
          </button>

          <button type="button" onClick={onExport} className="inline-flex items-center space-x-2 bg-[#6332ec] hover:bg-purple-800 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md transition-all cursor-pointer">
            <Download className="w-4 h-4 stroke-[2]" /><span>Export</span>
          </button>
        </div>
      </div>

      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-[#6332ec]" /><h3 className="text-lg font-black text-slate-900">Select Date Range</h3></div>
              <button onClick={() => setShowCalendarModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center justify-center gap-4 py-1.5 px-3 bg-slate-50 rounded-2xl text-xs font-black">
              <span className="flex items-center gap-1.5 text-emerald-700"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Start Date</span>
              <span className="flex items-center gap-1.5 text-red-600"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Ending Registration</span>
            </div>

            <div className="flex items-center justify-between px-2 pt-1">
              <button className="p-1 rounded-lg border border-slate-200"><ChevronLeft className="w-4 h-4" /></button>
              <span className="font-extrabold text-slate-900 text-sm">May 2024</span>
              <button className="p-1 rounded-lg border border-slate-200"><ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold pt-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (<span key={d} className="text-slate-400 py-1">{d}</span>))}
              <div /><div /><div />
              {daysInMonth.map((day) => {
                const isStart = startDate === day; const isEnd = endDate === day; const inRange = startDate && endDate && day > startDate && day < endDate;
                return (
                  <button key={day} onClick={() => handleDateClick(day)} className={`h-9 w-full rounded-xl font-black flex items-center justify-center cursor-pointer ${isStart ? "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300" : isEnd ? "bg-red-500 text-white shadow-md ring-2 ring-red-300" : inRange ? "bg-purple-100 text-purple-900" : "text-slate-700 hover:bg-slate-100"}`}>{day}</button>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold flex items-center justify-between">
              <span className="text-emerald-700">Start: <strong className="text-slate-900">{startDate ? `${startDate} May 2024` : "None"}</strong></span>
              <span className="text-red-600">Ending: <strong className="text-slate-900">{endDate ? `${endDate} May 2024` : "None"}</strong></span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button onClick={() => setShowCalendarModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm">Cancel</button>
              <button onClick={applyDateRange} className="px-5 py-2 rounded-xl bg-[#6332ec] text-white font-bold text-sm flex items-center gap-1.5 shadow-md"><Check className="w-4 h-4" /><span>Apply Range</span></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
