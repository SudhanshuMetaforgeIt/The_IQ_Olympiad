import React from "react";

export function PracticeProgressBanner() {
  return (
    <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-2.5 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-black text-violet-700 tracking-tight leading-tight">
            10 Free Practice Tests
          </h3>
          <p className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">
            You can attempt the first 10 practice tests for free. Track your progress below.
          </p>
        </div>
      </div>
    </div>
  );
}
