import React from "react";

export function PracticeProgressBanner() {
  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 shrink-0">
      {/* Left: Gift Icon + Explanation */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 sm:size-12 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-violet-700 tracking-tight leading-snug">
            10 Free Practice Tests Per Subject
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            You can attempt the first 10 practice tests for free in each subject. Track your subject progress below.
          </p>
        </div>
      </div>
    </div>
  );
}
