"use client";

import React from "react";

interface ActivitySummaryCardProps {
  onViewDetailedAnalytics?: () => void;
}

export function ActivitySummaryCard({
  onViewDetailedAnalytics,
}: ActivitySummaryCardProps) {
  const activities = [
    {
      id: "olympiads",
      label: "Olympiads Participated",
      value: "4",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: "exams",
      label: "Exams Completed",
      value: "7",
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      id: "practice",
      label: "Practice Tests Attempted",
      value: "109",
      iconBg: "bg-violet-50 text-violet-600 border border-violet-100",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: "avg-score",
      label: "Average Score",
      value: "72%",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: "study-time",
      label: "Total Study Time",
      value: "18h 45m",
      iconBg: "bg-teal-50 text-teal-600 border border-teal-100",
      icon: (
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2.5">
          <div className="size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
            Activity Summary
          </h3>
        </div>

        {/* Activity Rows */}
        <div className="space-y-1.5 divide-y divide-slate-100">
          {activities.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-2 ${
                idx > 0 ? "pt-1.5" : ""
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`size-5 rounded-md ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  {item.icon}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 truncate">
                  {item.label}
                </span>
              </div>

              <span className="text-xs font-black text-slate-900 shrink-0 font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* View Detailed Analytics Button */}
      <div className="mt-2.5 pt-1.5 border-t border-slate-100">
        <button
          type="button"
          onClick={onViewDetailedAnalytics}
          className="w-full py-1.5 rounded-lg border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
        >
          <span>View Detailed Analytics</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
