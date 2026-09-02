"use client";

import React from "react";
import type { PracticeResultRecord } from "./types";
import { TargetIcon } from "../../Commonn/icons";

interface PracticeResultsTableProps {
  results: PracticeResultRecord[];
  onViewAll?: () => void;
  onSelectPractice?: (practice: PracticeResultRecord) => void;
}

export function PracticeResultsTable({
  results,
  onViewAll,
  onSelectPractice,
}: PracticeResultsTableProps) {
  const renderPracticeIcon = (iconType: PracticeResultRecord["iconType"]) => {
    switch (iconType) {
      case "topic":
        return (
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-xs bg-violet-600"></span>
          </div>
        );
      case "mock":
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        );
      case "chapter":
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            <TargetIcon className="w-4 h-4 text-slate-600" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600">
            <TargetIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Practice Results
            </h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Overview of your performance in practice tests and mock tests.
            </p>
          </div>
        </div>

        {/* Practice Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs min-w-[520px]">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <th className="py-2.5 font-bold">Test Type</th>
                <th className="py-2.5 font-bold">Tests Attempted</th>
                <th className="py-2.5 font-bold">Average Score</th>
                <th className="py-2.5 font-bold">Average Percentage</th>
                <th className="py-2.5 font-bold text-right">Best Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectPractice?.(item)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  {/* Test Type & Icon */}
                  <td className="py-3.5 pr-2 font-bold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      {renderPracticeIcon(item.iconType)}
                      <span className="group-hover:text-violet-700 transition">
                        {item.testType}
                      </span>
                    </div>
                  </td>

                  {/* Tests Attempted */}
                  <td className="py-3.5 text-slate-700 font-semibold whitespace-nowrap">
                    {item.testsAttempted}
                  </td>

                  {/* Average Score */}
                  <td className="py-3.5 font-bold text-violet-600 whitespace-nowrap">
                    {item.averageScore} / {item.totalScore}
                  </td>

                  {/* Average Percentage */}
                  <td className="py-3.5 font-bold text-emerald-600 whitespace-nowrap">
                    {item.averagePercentage.toFixed(2)}%
                  </td>

                  {/* Best Score */}
                  <td className="py-3.5 text-right font-bold text-slate-700 whitespace-nowrap">
                    {item.bestScore} / {item.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer View All Button */}
      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-violet-700 hover:bg-violet-50 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View All Practice Results</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
