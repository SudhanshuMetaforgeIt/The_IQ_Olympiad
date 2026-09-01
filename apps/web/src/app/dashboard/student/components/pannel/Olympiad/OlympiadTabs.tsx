"use client";

import React from "react";
import type { FilterTab } from "./types";

interface OlympiadTabsProps {
  filterTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
}

export function OlympiadTabs({ filterTab, onSelectTab }: OlympiadTabsProps) {
  const tabs: { id: FilterTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "all",
      label: "All Olympiads",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      id: "ongoing",
      label: "Ongoing",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: "completed",
      label: "Completed",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
      {/* Left Tab Buttons */}
      <div className="flex items-center gap-6 sm:gap-8">
        {tabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2.5 py-2 font-bold text-base transition-all relative cursor-pointer ${
                isActive
                  ? "text-violet-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Categories Dropdown */}
      <button
        type="button"
        className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm bg-white hover:bg-slate-50 shadow-xs transition cursor-pointer"
      >
        <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
        <span>All Categories</span>
        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
