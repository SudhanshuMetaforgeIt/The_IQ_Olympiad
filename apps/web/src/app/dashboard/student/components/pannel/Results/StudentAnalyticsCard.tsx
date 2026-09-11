"use client";

import React from "react";

export function StudentAnalyticsCard() {
  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs space-y-3.5">
      {/* Card Title Header */}
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" x2="18" y1="20" y2="10" />
            <line x1="12" x2="12" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="14" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
            Student Analytics
          </h3>
          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
            Your performance insights and progress over time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
        <div className="bg-[#FAF8FF]/60 border border-violet-100/80 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[160px]">
          <h4 className="text-xs font-extrabold text-slate-900 mb-2 self-start">
            Performance Over Time
          </h4>
          <p className="text-sm font-medium text-slate-500 text-center py-8">
            No performance data yet
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 flex flex-col items-center justify-center min-h-[160px]">
          <h4 className="text-xs font-extrabold text-slate-900 mb-2 self-start">
            Subject-wise Average (%)
          </h4>
          <p className="text-sm font-medium text-slate-500 text-center py-8">
            No subject averages yet
          </p>
        </div>
      </div>
    </div>
  );
}
