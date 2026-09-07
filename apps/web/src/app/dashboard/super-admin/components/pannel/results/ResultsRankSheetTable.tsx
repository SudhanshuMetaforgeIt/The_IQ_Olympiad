"use client";

import React from "react";
import { Trophy, Info } from "lucide-react";
import { RankSheetRecord } from "./types";

interface ResultsRankSheetTableProps {
  records: RankSheetRecord[];
}

export function ResultsRankSheetTable({ records }: ResultsRankSheetTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1.5 font-black text-amber-500 text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
          <span>1</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1.5 font-black text-slate-400 text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-slate-400 fill-slate-300 shrink-0" />
          <span>2</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1.5 font-black text-amber-700 text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-amber-700 fill-amber-600 shrink-0" />
          <span>3</span>
        </div>
      );
    }
    return <span className="font-extrabold text-slate-700 px-2">{rank}</span>;
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
      {/* Title */}
      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
        Rank Sheet (Top 3 from All Schools)
      </h3>

      {/* Table Shell */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/60">
              <th className="py-3.5 px-4 min-w-[70px]">Rank</th>
              <th className="py-3.5 px-4 min-w-[200px]">Student Name</th>
              <th className="py-3.5 px-4 min-w-[120px]">Registration ID</th>
              <th className="py-3.5 px-4 min-w-[100px]">Roll No.</th>
              <th className="py-3.5 px-4 min-w-[200px]">School</th>
              <th className="py-3.5 px-4 min-w-[80px]">Class</th>
              <th className="py-3.5 px-4 min-w-[110px]">Score</th>
              <th className="py-3.5 px-4 min-w-[110px]">Percentage</th>
              <th className="py-3.5 px-4 min-w-[120px]">Result Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {records.length > 0 ? (
              records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Rank */}
                  <td className="py-4 px-4">{getRankBadge(rec.rank)}</td>

                  {/* Student Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${rec.avatarBg} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs`}
                      >
                        {rec.avatarInitials}
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {rec.studentName}
                      </span>
                    </div>
                  </td>

                  {/* Registration ID */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {rec.registrationId}
                  </td>

                  {/* Roll No */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {rec.rollNo}
                  </td>

                  {/* School */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-900 text-sm leading-snug">
                        {rec.schoolName}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {rec.schoolLocation}
                      </span>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                    {rec.classNum}
                  </td>

                  {/* Score */}
                  <td className="py-4 px-4 font-extrabold text-sm">
                    <span
                      className={
                        rec.rank === 1
                          ? "text-amber-600 font-black"
                          : "text-slate-800"
                      }
                    >
                      {rec.score}
                    </span>
                  </td>

                  {/* Percentage */}
                  <td className="py-4 px-4 font-black text-emerald-600 text-sm">
                    {rec.percentage}
                  </td>

                  {/* Result Status */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-100/80 text-emerald-700 text-xs font-extrabold">
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-400 font-semibold">
                  No rank sheet records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Info Note */}
      <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-400">
        <Info className="w-4 h-4 text-purple-600 shrink-0" />
        <span>Showing top 3 students overall from all schools based on highest scores.</span>
      </div>
    </div>
  );
}
