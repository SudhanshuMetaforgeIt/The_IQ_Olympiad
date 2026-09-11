"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X, Check, RotateCcw } from "lucide-react";

interface CalendarRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRange?: string;
  onApply: (formattedRange: string) => void;
  title?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function CalendarRangeModal({
  isOpen,
  onClose,
  currentRange = "01 May 2026 - 12 May 2026",
  onApply,
  title = "Select Date Range",
}: CalendarRangeModalProps) {
  // Default to May 2026 as per dashboard design
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(4); // May (0-indexed)
  const [startDay, setStartDay] = useState<number | null>(1);
  const [endDay, setEndDay] = useState<number | null>(12);

  useEffect(() => {
    if (currentRange && currentRange.includes("-")) {
      const parts = currentRange.split("-").map((p) => p.trim());
      if (parts.length === 2) {
        // e.g. "01 May 2026"
        const startMatch = parts[0].match(/(\d+)\s+([A-Za-z]+)\s+(\d+)/);
        const endMatch = parts[1].match(/(\d+)\s+([A-Za-z]+)\s+(\d+)/);

        if (startMatch && endMatch) {
          const sDay = parseInt(startMatch[1], 10);
          const eDay = parseInt(endMatch[1], 10);
          const monthIdx = MONTH_NAMES.findIndex(
            (m) => m.toLowerCase().startsWith(startMatch[2].toLowerCase().slice(0, 3))
          );
          const yr = parseInt(startMatch[3], 10);

          if (!isNaN(sDay)) setStartDay(sDay);
          if (!isNaN(eDay)) setEndDay(eDay);
          if (monthIdx !== -1) setCurrentMonth(monthIdx);
          if (!isNaN(yr)) setCurrentYear(yr);
        }
      }
    }
  }, [currentRange, isOpen]);

  if (!isOpen) return null;

  const daysInMonthCount = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDayClick = (day: number) => {
    if (startDay === null || (startDay !== null && endDay !== null)) {
      setStartDay(day);
      setEndDay(null);
    } else if (startDay !== null && endDay === null) {
      if (day < startDay) {
        setEndDay(startDay);
        setStartDay(day);
      } else {
        setEndDay(day);
      }
    }
  };

  const formatDayString = (day: number | null) => {
    if (!day) return "Select date";
    const padded = day < 10 ? `0${day}` : `${day}`;
    const shortMonth = MONTH_NAMES[currentMonth].slice(0, 3);
    return `${padded} ${shortMonth} ${currentYear}`;
  };

  const handleApply = () => {
    if (startDay && endDay) {
      const formatted = `${formatDayString(startDay)} - ${formatDayString(endDay)}`;
      onApply(formatted);
    } else if (startDay) {
      const formatted = `${formatDayString(startDay)} - ${formatDayString(startDay)}`;
      onApply(formatted);
    } else {
      onApply("01 May 2026 - 12 May 2026");
    }
    onClose();
  };

  const handleReset = () => {
    setStartDay(1);
    setEndDay(12);
    setCurrentMonth(4);
    setCurrentYear(2026);
  };

  const setPreset = (preset: "last7" | "last30" | "thisMonth" | "may2026") => {
    if (preset === "may2026") {
      setCurrentYear(2026);
      setCurrentMonth(4);
      setStartDay(1);
      setEndDay(12);
    } else if (preset === "thisMonth") {
      setCurrentYear(2026);
      setCurrentMonth(4);
      setStartDay(1);
      setEndDay(31);
    } else if (preset === "last7") {
      setCurrentYear(2026);
      setCurrentMonth(4);
      setStartDay(5);
      setEndDay(12);
    } else if (preset === "last30") {
      setCurrentYear(2026);
      setCurrentMonth(4);
      setStartDay(1);
      setEndDay(30);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#3B1EAE] flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{title}</h3>
              <p className="text-xs font-semibold text-slate-400">Click to select start and end dates</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setPreset("may2026")}
            className="px-3 py-1.5 rounded-lg bg-purple-50 text-[#3B1EAE] border border-purple-200 text-xs font-bold shrink-0 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            Default (01-12 May)
          </button>
          <button
            type="button"
            onClick={() => setPreset("last7")}
            className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Last 7 Days
          </button>
          <button
            type="button"
            onClick={() => setPreset("thisMonth")}
            className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shrink-0 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Full Month
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <span key={d} className="text-slate-400 py-1.5 uppercase text-[11px] tracking-wider">
              {d}
            </span>
          ))}

          {/* Empty cells before 1st day of month */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonthCount }, (_, i) => i + 1).map((day) => {
            const isStart = startDay === day;
            const isEnd = endDay === day;
            const inRange =
              startDay !== null &&
              endDay !== null &&
              day > startDay &&
              day < endDay;

            let btnClasses = "text-slate-700 hover:bg-slate-100";
            if (isStart || isEnd) {
              btnClasses = "bg-[#3B1EAE] text-white font-extrabold shadow-md ring-2 ring-purple-300";
            } else if (inRange) {
              btnClasses = "bg-purple-100 text-[#3B1EAE] font-bold";
            }

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                className={`h-9 w-full rounded-xl font-bold flex items-center justify-center cursor-pointer transition-all ${btnClasses}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Selected Range Display */}
        <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-2xl text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#3B1EAE]">
            <span>Start:</span>
            <strong className="text-slate-900">{formatDayString(startDay)}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-[#3B1EAE]">
            <span>End:</span>
            <strong className="text-slate-900">{formatDayString(endDay || startDay)}</strong>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#3B1EAE] text-white font-extrabold text-xs hover:bg-purple-800 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Apply Range</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
