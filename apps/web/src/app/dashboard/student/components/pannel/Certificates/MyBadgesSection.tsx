"use client";

import React from "react";
import {
  OlympiadAchieverBadgeGraphic,
  ProblemSolverBadgeGraphic,
  AccuracyMasterBadgeGraphic,
  RisingStarBadgeGraphic,
  ConsistencyChampionBadgeGraphic,
  OlympiadChampionBadgeGraphic,
  TrophyIllustrationPurple,
} from "./badgeIcons";

interface MyBadgesSectionProps {
  studentName?: string;
}

export function MyBadgesSection({ studentName = "Rahul" }: MyBadgesSectionProps) {
  return (
    <div className="space-y-7">
      {/* 1. Earned Badges Section */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Earned Badges <span className="text-violet-600">(2)</span>
          </h3>
        </div>

        {/* 2 Earned Badge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Olympiad Achiever */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-start gap-4 relative hover:shadow-md transition-shadow">
            <OlympiadAchieverBadgeGraphic className="w-20 h-20" />

            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-base font-black text-slate-900 leading-tight">
                Olympiad Achiever
              </h4>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                Awarded for achieving a qualifying score or rank in an Olympiad.
              </p>

              <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg w-fit">
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>Earned on 28 Aug 2026</span>
              </div>
            </div>

            {/* Earned Checkmark */}
            <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Card 2: Problem Solver */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-start gap-4 relative hover:shadow-md transition-shadow">
            <ProblemSolverBadgeGraphic className="w-20 h-20" />

            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-base font-black text-slate-900 leading-tight">
                Problem Solver
              </h4>
              <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                Awarded for excellent problem-solving and reasoning skills.
              </p>

              <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg w-fit">
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>Earned on 18 Sep 2026</span>
              </div>
            </div>

            {/* Earned Checkmark */}
            <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Locked Badges Section */}
      <div className="space-y-3.5 pt-1">
        <div className="flex items-center gap-2">
          <svg className="w-4.5 h-4.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Locked Badges <span className="text-slate-600 font-bold">(4)</span>
          </h3>
        </div>

        {/* 4 Locked Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Locked Badge 1: Accuracy Master */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between items-center text-center relative hover:shadow-md transition-shadow min-h-[280px]">
            {/* Lock Icon Top Right */}
            <div className="absolute right-4 top-4 text-slate-400">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <AccuracyMasterBadgeGraphic className="w-20 h-20 mt-1" />

            <div className="my-2">
              <h4 className="text-base font-black text-slate-900">Accuracy Master</h4>
              <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed max-w-[200px]">
                Maintain 90% or higher accuracy in a test.
              </p>
            </div>

            <div className="w-full space-y-2 pt-3 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-violet-600 h-2 rounded-full w-[84%]" />
              </div>
              <span className="text-xs font-bold text-violet-700 block">
                76% / 90% accuracy
              </span>
            </div>
          </div>

          {/* Locked Badge 2: Rising Star */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between items-center text-center relative hover:shadow-md transition-shadow min-h-[280px]">
            {/* Lock Icon Top Right */}
            <div className="absolute right-4 top-4 text-slate-400">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <RisingStarBadgeGraphic className="w-20 h-20 mt-1" />

            <div className="my-2">
              <h4 className="text-base font-black text-slate-900">Rising Star</h4>
              <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed max-w-[200px]">
                Improve your score by 15% or more compared to your previous attempt.
              </p>
            </div>

            <div className="w-full space-y-2 pt-3 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-violet-600 h-2 rounded-full w-[80%]" />
              </div>
              <span className="text-xs font-bold text-violet-700 block">
                12% / 15% improvement
              </span>
            </div>
          </div>

          {/* Locked Badge 3: Consistency Champion */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between items-center text-center relative hover:shadow-md transition-shadow min-h-[280px]">
            {/* Lock Icon Top Right */}
            <div className="absolute right-4 top-4 text-slate-400">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <ConsistencyChampionBadgeGraphic className="w-20 h-20 mt-1" />

            <div className="my-2">
              <h4 className="text-base font-black text-slate-900">Consistency Champion</h4>
              <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed max-w-[200px]">
                Complete practice or mock tests for 4 consecutive weeks.
              </p>
            </div>

            <div className="w-full space-y-2 pt-3 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-violet-600 h-2 rounded-full w-[75%]" />
              </div>
              <span className="text-xs font-bold text-violet-700 block">
                3 / 4 weeks
              </span>
            </div>
          </div>

          {/* Locked Badge 4: Olympiad Champion */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between items-center text-center relative hover:shadow-md transition-shadow min-h-[280px]">
            {/* Lock Icon Top Right */}
            <div className="absolute right-4 top-4 text-slate-400">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <OlympiadChampionBadgeGraphic className="w-20 h-20 mt-1" />

            <div className="my-2">
              <h4 className="text-base font-black text-slate-900">Olympiad Champion</h4>
              <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed max-w-[200px]">
                Achieve top rank, medal or distinction in an Olympiad.
              </p>
            </div>

            <div className="w-full pt-3 border-t border-slate-100">
              <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-violet-200 bg-violet-50/70 text-violet-700 font-bold text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Reach Top Rank to Unlock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Banner Strip */}
      <div className="bg-gradient-to-r from-violet-50/90 via-purple-50/70 to-indigo-50/90 rounded-3xl p-5 sm:p-6 border border-violet-100/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-11 sm:size-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/25">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Keep going, {studentName}!
            </h4>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              Your dedication today builds your success tomorrow.
            </p>
          </div>
        </div>

        <TrophyIllustrationPurple className="w-20 h-20 sm:w-24 sm:h-24 self-center sm:self-auto" />
      </div>
    </div>
  );
}
