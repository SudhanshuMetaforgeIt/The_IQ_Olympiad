"use client";

import React from "react";
import type { FilterTab } from "./types";

interface OlympiadTabsProps {
  filterTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
  registeredCount?: number;
}

export function OlympiadTabs({
  filterTab,
  onSelectTab,
  registeredCount = 1,
}: OlympiadTabsProps) {
  const tabs: { id: FilterTab; label: string; badge?: number; icon: React.ReactNode }[] = [
    {
      id: "all",
      label: "All Olympiads",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "registered",
      label: "Registered Exams",
      badge: registeredCount,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      id: "ongoing",
      label: "Ongoing",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: "completed",
      label: "Completed",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
      {/* Left Tab Buttons */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {tabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-1.5 py-1.5 font-bold text-xs sm:text-sm transition-all relative cursor-pointer ${
                isActive
                  ? "text-violet-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-black transition-colors ${
                    isActive
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Categories Dropdown */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs bg-white hover:bg-slate-50 shadow-2xs transition cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
        <span>All Categories</span>
        <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
