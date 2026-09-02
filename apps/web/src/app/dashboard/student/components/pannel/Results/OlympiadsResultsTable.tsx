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
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <FlaskIcon className="w-4 h-4 text-emerald-600" />
          </div>
        );
      case "math":
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <MathCalcIcon className="w-4 h-4 text-indigo-600" />
          </div>
        );
      case "english":
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
        );
      case "cyber":
        return (
          <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-violet-600">IQ</span>
          </div>
        );
    }
  };

  const renderMedal = (medal: OlympiadResultRecord["medal"]) => {
    switch (medal) {
      case "gold":
        return <span className="text-base" title="Gold Medal">🥇</span>;
      case "silver":
        return <span className="text-base" title="Silver Medal">🥈</span>;
      case "bronze":
        return <span className="text-base" title="Bronze Medal">🥉</span>;
      default:
        return <span className="text-xs text-slate-400">—</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header with All Subjects Dropdown above the table */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Olympiads Results
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                Overview of your performance in Olympiad exams.
              </p>
            </div>
          </div>

          {/* All Subjects dropdown filter positioned above the Olympiad results table */}
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
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <th className="py-2.5 font-bold">Olympiad</th>
                <th className="py-2.5 font-bold">Date</th>
                <th className="py-2.5 font-bold">Score</th>
                <th className="py-2.5 font-bold">Percentage</th>
                <th className="py-2.5 font-bold">National Rank</th>
                <th className="py-2.5 font-bold text-center">Medal</th>
                <th className="py-2.5 font-bold text-right">Result</th>
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
                  <td className="py-3.5 pr-2 font-bold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      {renderSubjectIcon(item.iconType)}
                      <span className="group-hover:text-violet-700 transition">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 text-slate-500 font-medium whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Score */}
                  <td className="py-3.5 font-bold text-violet-600 whitespace-nowrap">
                    {item.score} / {item.totalScore}
                  </td>

                  {/* Percentage */}
                  <td className="py-3.5 font-bold text-emerald-600 whitespace-nowrap">
                    {item.percentage.toFixed(2)}%
                  </td>

                  {/* National Rank */}
                  <td className="py-3.5 font-semibold text-slate-700 whitespace-nowrap">
                    {item.nationalRank.toLocaleString()}
                  </td>

                  {/* Medal */}
                  <td className="py-3.5 text-center whitespace-nowrap">
                    {renderMedal(item.medal)}
                  </td>

                  {/* Result Badge */}
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
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

      {/* Footer View All Button */}
      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-violet-700 hover:bg-violet-50 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View All Olympiad Results</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
