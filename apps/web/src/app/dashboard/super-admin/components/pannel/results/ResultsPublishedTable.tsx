"use client";

import React from "react";
import { Eye, Download, Award } from "lucide-react";
import { PublishedResultRecord } from "./types";

interface ResultsPublishedTableProps {
  results: PublishedResultRecord[];
}

export function ResultsPublishedTable({ results }: ResultsPublishedTableProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
      {/* Title */}
      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
        Published Results (24 Olympiads)
      </h3>

      {/* Table Shell */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/60">
              <th className="py-3.5 px-4 min-w-[60px]">S.No.</th>
              <th className="py-3.5 px-4 min-w-[220px]">Olympiad Name</th>
              <th className="py-3.5 px-4 min-w-[120px]">Exam Code</th>
              <th className="py-3.5 px-4 min-w-[80px]">Class</th>
              <th className="py-3.5 px-4 min-w-[150px]">Participated Students</th>
              <th className="py-3.5 px-4 min-w-[170px]">Result Published On</th>
              <th className="py-3.5 px-4 min-w-[130px]">Published By</th>
              <th className="py-3.5 px-4 min-w-[160px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {results.length > 0 ? (
              results.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* S.No. */}
                  <td className="py-4 px-4 font-bold text-slate-600 text-sm">
                    {res.sNo}
                  </td>

                  {/* Olympiad Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${res.iconBg} ${res.iconColor} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs`}
                      >
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {res.olympiadName}
                      </span>
                    </div>
                  </td>

                  {/* Exam Code */}
                  <td className="py-4 px-4 font-extrabold text-slate-800 text-sm">
                    {res.examCode}
                  </td>

                  {/* Class */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {res.classRange}
                  </td>

                  {/* Participated Students */}
                  <td className="py-4 px-4 font-black text-slate-900 text-sm">
                    {res.participatedStudents.toLocaleString()}
                  </td>

                  {/* Result Published On */}
                  <td className="py-4 px-4 font-medium text-slate-500 text-xs">
                    {res.publishedOn}
                  </td>

                  {/* Published By */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {res.publishedBy}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200/90 bg-purple-50/70 text-purple-700 font-extrabold text-xs hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-600" />
                        <span>View Results</span>
                      </button>

                      <button
                        type="button"
                        className="w-8 h-8 rounded-xl border border-purple-200/90 bg-purple-50/70 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer shrink-0"
                        title="Download Scorecard"
                      >
                        <Download className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-400 font-semibold">
                  No published results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
