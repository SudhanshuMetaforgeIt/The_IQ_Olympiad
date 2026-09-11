"use client";

import React from "react";
import { StarIcon } from "./icons";

interface AchievementsCardProps {
  onViewAll?: () => void;
}

export function AchievementsCard({ onViewAll }: AchievementsCardProps) {
  return (
    <div className="h-full flex flex-col justify-between space-y-3.5">
      {/* Achievements Interactive Showcase Box */}
      <div className="bg-gradient-to-b from-[#FAF8FF] via-white to-violet-50/40 rounded-3xl p-4 sm:p-5 border border-violet-200/80 shadow-xs flex-1 flex flex-col justify-between text-center relative overflow-hidden group">
        {/* Card Header */}
        <div className="w-full flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🏅</span>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Achievements
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-violet-700 hover:text-violet-900 transition cursor-pointer flex items-center gap-1 bg-white hover:bg-violet-50 px-2.5 py-1 rounded-xl shadow-2xs border border-violet-200/80"
          >
            <span>View All</span>
            <span className="text-violet-500 font-bold">›</span>
          </button>
        </div>

        {/* Empty state */}
        <div className="relative my-4 flex flex-col items-center justify-center select-none z-10 flex-1 py-6">
          <div className="size-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl mb-3">
            🏅
          </div>
          <p className="text-sm font-bold text-slate-700">No badges earned yet</p>
          <p className="text-[11px] font-medium text-slate-500 mt-1 max-w-[220px]">
            Complete exams and practice tests to unlock achievement badges.
          </p>
        </div>
      </div>

      {/* Encouraging Banner Box */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200/80 rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
        <div className="size-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
          <StarIcon className="w-4 h-4 fill-white" />
        </div>
        <div>
          <h5 className="text-xs font-black text-slate-900">
            You are doing great!
          </h5>
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 leading-snug mt-0.5">
            Keep practicing and stay consistent. Success is on your way!
          </p>
        </div>
      </div>
    </div>
  );
}
