"use client";

import React from "react";
import type { PracticeResultRecord } from "./types";
import { TargetIcon } from "../../Common/icons";

interface PracticeResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: PracticeResultRecord[];
  selectedPractice?: PracticeResultRecord | null;
}

export function PracticeResultsModal({
  isOpen,
  onClose,
  results,
  selectedPractice,
}: PracticeResultsModalProps) {
  if (!isOpen) return null;

  const hasResults = results.length > 0;
  const totalAttempted = results.reduce((acc, r) => acc + r.testsAttempted, 0);
  const avgPct = hasResults
    ? Math.round(results.reduce((acc, r) => acc + r.averagePercentage, 0) / results.length)
    : null;
  const highestScore = hasResults
    ? Math.max(...results.map((r) => r.bestScore))
    : null;

  const displayList = selectedPractice ? [selectedPractice] : results;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-violet-50 border border-violet-100 text-violet-600 flex items-center justify-center shrink-0">
              <TargetIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                {selectedPractice ? `${selectedPractice.testType} Results` : "Practice Test Results"}
              </h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Detailed scorecards & performance analysis for practice tests
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Top Aggregate Summary Strip (when viewing all) */}
          {!selectedPractice && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-violet-50/70 border border-violet-100 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-extrabold text-violet-600 uppercase tracking-wider block">
                  Tests Done
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block mt-0.5">
                  {hasResults ? totalAttempted : "—"}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Attempted</span>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                  Avg. Score
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 block mt-0.5">
                  {avgPct != null ? `${avgPct}%` : "—"}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Overall</span>
              </div>

              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">
                  Best Score
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 block mt-0.5">
                  {highestScore != null ? `${highestScore}/100` : "—"}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Peak Performance</span>
              </div>
            </div>
          )}

          {/* Test Type Scorecards */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {selectedPractice ? "Test Category Performance" : "Performance By Practice Category"}
            </h3>

            {displayList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-10 px-4 text-center">
                <p className="text-sm font-medium text-slate-500">No results available yet</p>
              </div>
            ) : (
              displayList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-violet-100/70 text-violet-700 flex items-center justify-center font-bold text-xs">
                      {item.iconType === "topic" ? "📚" : item.iconType === "mock" ? "🎯" : "📖"}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        {item.testType}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.testsAttempted} tests completed
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-600 block leading-tight">
                      {item.averagePercentage.toFixed(1)}% Avg
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Best: {item.bestScore}/100
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.averagePercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                    <span>Average Score: <strong className="text-slate-800">{item.averageScore}/{item.totalScore}</strong></span>
                    <span className="text-emerald-700 font-bold">Passing: 50%</span>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>

          {/* Practice Insights Box */}
          <div className="bg-violet-50/70 border border-violet-100 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-violet-100 text-violet-600 shrink-0 mt-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-violet-900">
                Practice Insights
              </h4>
              <p className="text-xs font-medium text-slate-600 leading-snug mt-0.5">
                {hasResults && highestScore != null
                  ? `Your highest practice score so far is ${highestScore}/100. Keep practicing to improve consistency across subjects.`
                  : "Complete practice tests to see performance insights here."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
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
