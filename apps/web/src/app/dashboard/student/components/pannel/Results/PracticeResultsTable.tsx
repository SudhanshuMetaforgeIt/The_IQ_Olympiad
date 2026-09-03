"use client";

import React from "react";
import type { PracticeResultRecord } from "./types";
import { TargetIcon } from "../../Common/icons";

interface PracticeResultsTableProps {
  results: PracticeResultRecord[];
  onViewAll?: () => void;
  onSelectPractice?: (item: PracticeResultRecord) => void;
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
          <div className="size-6 rounded-md bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
            <TargetIcon className="w-3.5 h-3.5 text-violet-600" />
          </div>
        );
      case "chapter":
        return (
          <div className="size-6 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
            </svg>
          </div>
        );
      case "mock":
      default:
        return (
          <div className="size-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="size-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600">
            <TargetIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Practice Results
            </h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              Overview of your performance in practice tests and mock tests.
            </p>
          </div>
        </div>

        {/* Practice Table */}
        <div className="overflow-x-auto -mx-3.5 sm:-mx-4 px-3.5 sm:px-4">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-1.5 text-[11px]">
                <th className="py-2 font-bold">Test Type</th>
                <th className="py-2 font-bold">Attempted</th>
                <th className="py-2 font-bold">Avg Score</th>
                <th className="py-2 font-bold">Avg %</th>
                <th className="py-2 font-bold text-right">Best Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm font-medium text-slate-500">
                    No attempts yet
                  </td>
                </tr>
              ) : (
                results.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectPractice?.(item)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  {/* Test Type & Icon */}
                  <td className="py-2 pr-2 font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      {renderPracticeIcon(item.iconType)}
                      <span className="group-hover:text-violet-700 transition text-xs">
                        {item.testType}
                      </span>
                    </div>
                  </td>

                  {/* Tests Attempted */}
                  <td className="py-2 text-slate-700 font-semibold whitespace-nowrap text-xs">
                    {item.testsAttempted}
                  </td>

                  {/* Average Score */}
                  <td className="py-2 font-bold text-violet-600 whitespace-nowrap text-xs">
                    {item.averageScore} / {item.totalScore}
                  </td>

                  {/* Average Percentage */}
                  <td className="py-2 font-bold text-emerald-600 whitespace-nowrap text-xs">
                    {item.averagePercentage.toFixed(2)}%
                  </td>

                  {/* Best Score */}
                  <td className="py-2 text-right font-bold text-slate-700 whitespace-nowrap text-xs">
                    {item.bestScore} / {item.totalScore}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer View All Button */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onViewAll}
          className="w-full py-2 rounded-xl border border-violet-200 hover:border-violet-300 text-violet-700 font-bold text-xs bg-violet-50/40 hover:bg-violet-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>View All Practice Results</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
