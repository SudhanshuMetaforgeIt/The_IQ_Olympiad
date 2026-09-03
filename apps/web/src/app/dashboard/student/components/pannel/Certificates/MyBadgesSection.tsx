"use client";

import React from "react";
import {
  AccuracyMasterBadgeGraphic,
  RisingStarBadgeGraphic,
  ConsistencyChampionBadgeGraphic,
  OlympiadChampionBadgeGraphic,
  TrophyIllustrationPurple,
} from "./badgeIcons";

interface MyBadgesSectionProps {
  studentName?: string;
}

const LOCKED_BADGES = [
  {
    id: "accuracy",
    title: "Accuracy Master",
    description: "Maintain 90% or higher accuracy in a test.",
    graphic: AccuracyMasterBadgeGraphic,
  },
  {
    id: "rising",
    title: "Rising Star",
    description: "Improve score by 15% or more compared to previous attempt.",
    graphic: RisingStarBadgeGraphic,
  },
  {
    id: "consistency",
    title: "Consistency Champion",
    description: "Complete tests for 4 consecutive weeks.",
    graphic: ConsistencyChampionBadgeGraphic,
  },
  {
    id: "champion",
    title: "Olympiad Champion",
    description: "Achieve top rank or distinction in an Olympiad.",
    graphic: OlympiadChampionBadgeGraphic,
  },
] as const;

export function MyBadgesSection({ studentName }: MyBadgesSectionProps) {
  const displayName = studentName?.trim() || "Student";

  return (
    <div className="space-y-4">
      {/* 1. Earned Badges Section */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Earned Badges <span className="text-violet-600">(0)</span>
          </h3>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 px-4 text-center">
          <div className="size-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-2xl mx-auto mb-3">
            🏅
          </div>
          <p className="text-sm font-bold text-slate-700">No badges earned yet</p>
          <p className="text-xs font-medium text-slate-500 mt-1 max-w-[280px] mx-auto">
            Complete exams and practice tests to unlock achievement badges.
          </p>
        </div>
      </div>

      {/* 2. Locked Badges Section — catalog of available badge types (no fake progress) */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Locked Badges <span className="text-slate-600 font-bold">({LOCKED_BADGES.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {LOCKED_BADGES.map((badge) => {
            const Graphic = badge.graphic;
            return (
              <div
                key={badge.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between items-center text-center relative hover:shadow-sm transition-shadow min-h-[210px]"
              >
                <div className="absolute right-3 top-3 text-slate-400">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <Graphic className="w-14 h-14 mt-1" />

                <div className="my-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">{badge.title}</h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-tight max-w-[180px]">
                    {badge.description}
                  </p>
                </div>

                <div className="w-full pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50/70 text-violet-700 font-bold text-[11px]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Locked</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Banner Strip */}
      <div className="bg-gradient-to-r from-violet-50/90 via-purple-50/70 to-indigo-50/90 rounded-2xl p-3.5 sm:p-4 border border-violet-100/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
              Keep going, {displayName}!
            </h4>
            <p className="text-[11px] font-medium text-slate-500">
              Your dedication today builds your success tomorrow.
            </p>
          </div>
        </div>

        <TrophyIllustrationPurple className="w-14 h-14 self-center sm:self-auto" />
      </div>
    </div>
  );
}
