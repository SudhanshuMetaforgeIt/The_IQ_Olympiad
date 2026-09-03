import React from "react";

interface PracticeTestMetricsBarProps {
  secondsRemaining: number;
  totalQuestions: number;
  totalMarks?: number;
}

export function PracticeTestMetricsBar({
  secondsRemaining,
  totalQuestions,
  totalMarks = 100,
}: PracticeTestMetricsBarProps) {
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
      {/* Difficulty Level */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase block leading-tight">
            Difficulty Level
          </span>
          <span className="text-base font-black text-emerald-600 leading-tight">
            Medium
          </span>
        </div>
      </div>

      {/* Time Left */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase block leading-tight">
            Time Left
          </span>
          <span className="text-base font-black text-violet-700 leading-tight">
            {formatTimer(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase block leading-tight">
            Questions
          </span>
          <span className="text-base font-black text-slate-900 leading-tight">
            {totalQuestions}
          </span>
        </div>
      </div>

      {/* Total Marks */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase block leading-tight">
            Total Marks
          </span>
          <span className="text-base font-black text-slate-900 leading-tight">
            {totalMarks}
          </span>
        </div>
      </div>
    </div>
  );
}
