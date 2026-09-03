"use client";

import React from "react";
import type { OlympiadResultRecord } from "./types";
import { FlaskIcon, MathCalcIcon } from "../../Common/icons";
import { ResultsFilters } from "./ResultsFilters";

interface OlympiadsResultsTableProps {
  results: OlympiadResultRecord[];
  selectedSubject?: string;
  onSelectSubject?: (subj: string) => void;
  onViewAll?: () => void;
  onSelectResult?: (result: OlympiadResultRecord) => void;
}

export function OlympiadsResultsTable({
  results,
  selectedSubject,
  onSelectSubject,
  onViewAll,
  onSelectResult,
}: OlympiadsResultsTableProps) {
  const renderSubjectIcon = (iconType: OlympiadResultRecord["iconType"]) => {
    switch (iconType) {
      case "science":
        return (
          <div className="size-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <FlaskIcon className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        );
      case "math":
        return (
          <div className="size-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <MathCalcIcon className="w-3.5 h-3.5 text-indigo-600" />
          </div>
        );
      case "english":
        return (
          <div className="size-6 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
        );
      case "cyber":
        return (
          <div className="size-6 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="14" x="3" y="4" rx="2" />
              <line x1="8" x2="16" y1="20" y2="20" />
              <line x1="12" x2="12" y1="18" y2="20" />
              <path d="m7 9 3 3-3 3" />
              <line x1="13" x2="17" y1="15" y2="15" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="size-6 rounded-md bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-violet-600">IQ</span>
          </div>
        );
    }
  };

  const renderMedal = (medal: OlympiadResultRecord["medal"]) => {
    switch (medal) {
      case "gold":
        return <span className="text-sm" title="Gold Medal">🥇</span>;
      case "silver":
        return <span className="text-sm" title="Silver Medal">🥈</span>;
      case "bronze":
        return <span className="text-sm" title="Bronze Medal">🥉</span>;
      default:
        return <span className="text-xs text-slate-400">—</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Card Header with All Subjects Dropdown above the table */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Olympiads Results
              </h3>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                Overview of your performance in Olympiad exams.
              </p>
            </div>
          </div>

          {/* All Subjects dropdown filter */}
          {selectedSubject && onSelectSubject && (
            <div className="self-end sm:self-center">
              <ResultsFilters
                selectedSubject={selectedSubject}
                onSelectSubject={onSelectSubject}
              />
            </div>
          )}
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto -mx-3.5 sm:-mx-4 px-3.5 sm:px-4">
          <table className="w-full text-left text-xs min-w-[540px]">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-1.5 text-[11px]">
                <th className="py-2 font-bold">Olympiad</th>
                <th className="py-2 font-bold">Date</th>
                <th className="py-2 font-bold">Score</th>
                <th className="py-2 font-bold">Percentage</th>
                <th className="py-2 font-bold">Rank</th>
                <th className="py-2 font-bold text-center">Medal</th>
                <th className="py-2 font-bold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectResult?.(item)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  {/* Olympiad Name & Icon */}
                  <td className="py-2 pr-2 font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      {renderSubjectIcon(item.iconType)}
                      <span className="group-hover:text-violet-700 transition text-xs">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-2 text-slate-500 font-medium whitespace-nowrap text-[11px]">
                    {item.date}
                  </td>

                  {/* Score */}
                  <td className="py-2 font-bold text-violet-600 whitespace-nowrap text-xs">
                    {item.score} / {item.totalScore}
                  </td>

                  {/* Percentage */}
                  <td className="py-2 font-bold text-emerald-600 whitespace-nowrap text-xs">
                    {item.percentage.toFixed(2)}%
                  </td>

                  {/* National Rank */}
                  <td className="py-2 font-semibold text-slate-700 whitespace-nowrap text-xs">
                    {item.nationalRank.toLocaleString()}
                  </td>

                  {/* Medal */}
                  <td className="py-2 text-center whitespace-nowrap">
                    {renderMedal(item.medal)}
                  </td>

                  {/* Result Badge */}
                  <td className="py-2 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.resultStatus === "Qualified"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}
                    >
                      {item.resultStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Button */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onViewAll}
          className="w-full py-2 rounded-xl border border-violet-200 hover:border-violet-300 text-violet-700 font-bold text-xs bg-violet-50/40 hover:bg-violet-50 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <span>View All Olympiads Results</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
