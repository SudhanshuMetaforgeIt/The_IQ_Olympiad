"use client";

import React from "react";
import {
  OlympiadAchieverBadgeGraphic,
  ProblemSolverBadgeGraphic,
} from "../pannel/Certificates/badgeIcons";

interface EarnedBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarnedBadgesModal({
  isOpen,
  onClose,
}: EarnedBadgesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏅</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                My Earned Badges
              </h2>
              <p className="text-xs font-medium text-slate-500">
                You have unlocked 2 special achievement badges!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body - Earned Badges List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Badge 1: Olympiad Achiever */}
          <div className="bg-gradient-to-r from-amber-50/70 via-yellow-50/40 to-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs flex items-start gap-4 relative">
            <OlympiadAchieverBadgeGraphic className="w-20 h-20" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Olympiad Achiever
                </h3>
                <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
                  ✓
                </span>
              </div>

              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                Awarded for achieving a qualifying score and top 10% rank in Science Olympiad 2026.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  🏆 Top 9.9% Rank
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  📅 28 Aug 2026
                </span>
              </div>
            </div>
          </div>

          {/* Badge 2: Problem Solver */}
          <div className="bg-gradient-to-r from-violet-50/70 via-purple-50/40 to-white rounded-2xl p-4 sm:p-5 border border-violet-200/80 shadow-xs flex items-start gap-4 relative">
            <ProblemSolverBadgeGraphic className="w-20 h-20" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Problem Solver
                </h3>
                <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
                  ✓
                </span>
              </div>

              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                Awarded for scoring 90% in Mathematics Olympiad with excellent analytical reasoning.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-violet-800 bg-violet-100/80 px-2.5 py-0.5 rounded-lg border border-violet-200">
                  🧠 90% Math Score
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  📅 18 Sep 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
