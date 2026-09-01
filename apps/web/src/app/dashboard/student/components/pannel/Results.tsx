"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE, RECENT_RESULTS, PERFORMANCE_METRICS } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";
import { PerformanceModal } from "../Commonn/PerformanceModal";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "../Commonn/icons";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

const ALL_RESULTS = [
  ...RECENT_RESULTS,
  {
    id: "res-gk-2026",
    title: "General Knowledge Olympiad 2026",
    completedDate: "Completed on 20 Jul 2026",
    rank: 8,
    badgeName: "Gold Medal",
    badgeVariant: "gold" as const,
    scorePercentage: 92,
    subjectIcon: "trophy" as const,
  },
  {
    id: "res-cyber-2025",
    title: "Cyber Olympiad 2025",
    completedDate: "Completed on 10 Nov 2025",
    rank: 14,
    badgeName: "Silver Medal",
    badgeVariant: "silver" as const,
    scorePercentage: 84,
    subjectIcon: "math" as const,
  },
];

export default function ResultsPanel({ activeTab = "results", onSelectTab }: PanelProps) {
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar student={STUDENT_PROFILE} />

        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
                EXAM RESULTS & ANALYTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                All Exam Results 🏆
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                View your detailed scorecards, national rankings, and subject performance metrics.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPerformanceModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer shrink-0"
            >
              Overall Performance Breakdown ›
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Average Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-emerald-600">85%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Top 5%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Exams Completed</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-violet-600">{ALL_RESULTS.length}</span>
                <span className="text-xs font-bold text-slate-500">Exams</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Best National Rank</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-amber-500">#8</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">State Level</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Badges & Medals</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-purple-600">4</span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">2 Gold • 2 Silver</span>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Completed Olympiad Exams
            </h3>

            <div className="divide-y divide-slate-100">
              {ALL_RESULTS.map((item) => (
                <div
                  key={item.id}
                  className="py-5 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 rounded-2xl p-3 -mx-3 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 shadow-xs">
                      {item.subjectIcon === "science" ? (
                        <FlaskIcon className="w-7 h-7 text-emerald-600" />
                      ) : item.subjectIcon === "math" ? (
                        <MathCalcIcon className="w-7 h-7 text-indigo-600" />
                      ) : (
                        <TrophyLogoIcon className="w-7 h-7 text-amber-500" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {item.completedDate}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                          <span>🏆</span> Rank: #{item.rank}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${item.badgeVariant === "gold"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                        >
                          {item.badgeName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Percentage & Action Button */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-600 block leading-none">
                        {item.scorePercentage}%
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 block">
                        Final Score
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPerformanceModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl border border-violet-200 text-violet-700 font-bold text-xs hover:bg-violet-50 transition cursor-pointer"
                    >
                      View Scorecard ›
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Performance Modal Popup */}
      <PerformanceModal
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
      />
    </div>
  );
}
