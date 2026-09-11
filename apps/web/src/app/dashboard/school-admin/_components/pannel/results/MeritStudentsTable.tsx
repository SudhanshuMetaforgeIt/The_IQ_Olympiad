"use client";

import React from "react";
import { Eye, Download, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { ResultRecord } from "./types";
import { downloadStudentReport } from "./exportUtils";

interface MeritStudentsTableProps {
  results: ResultRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalRecordsCount: number;
}

export function MeritStudentsTable({
  results,
  currentPage,
  setCurrentPage,
  totalRecordsCount = 1418,
}: MeritStudentsTableProps) {
  const meritList = [
    { rank: 1, medalBg: "bg-amber-100 text-amber-800 border-amber-300", medal: "🥇 Gold Medalist", ...results[0] },
    { rank: 2, medalBg: "bg-slate-100 text-slate-700 border-slate-300", medal: "🥈 Silver Medalist", ...results[1] },
    { rank: 3, medalBg: "bg-amber-700/10 text-amber-900 border-amber-400", medal: "🥉 Bronze Medalist", ...results[2] },
    { rank: 4, medalBg: "bg-purple-50 text-purple-700 border-purple-200", medal: "⭐ Merit Certificate", ...results[3] },
    { rank: 5, medalBg: "bg-purple-50 text-purple-700 border-purple-200", medal: "⭐ Merit Certificate", ...results[4] },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      {/* Table Title */}
      <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Merit & Rank Holders List</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs font-black text-slate-600 uppercase tracking-wider bg-slate-50/70">
              <th className="py-3.5 px-6">RANK</th>
              <th className="py-3.5 px-6">STUDENT NAME</th>
              <th className="py-3.5 px-4">CLASS</th>
              <th className="py-3.5 px-4">EXAM NAME</th>
              <th className="py-3.5 px-4">MARKS OBTAINED</th>
              <th className="py-3.5 px-4">TOTAL MARKS</th>
              <th className="py-3.5 px-4">PERCENTAGE</th>
              <th className="py-3.5 px-4">GRADE</th>
              <th className="py-3.5 px-4">ACHIEVEMENT / MEDAL</th>
              <th className="py-3.5 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {meritList.map((item) => (
              <tr key={item.id || item.rank} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-6">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-black text-xs border ${
                    item.rank === 1 ? "bg-amber-400 text-slate-900 border-amber-500" :
                    item.rank === 2 ? "bg-slate-300 text-slate-900 border-slate-400" :
                    item.rank === 3 ? "bg-amber-700 text-white border-amber-800" :
                    "bg-slate-100 text-slate-700 border-slate-200"
                  }`}>
                    #{item.rank}
                  </span>
                </td>

                <td className="py-3.5 px-6">
                  <div className="flex items-center space-x-3.5">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.studentName}
                        className="w-9 h-9 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className={`w-9 h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200/60`}>
                        {item.studentName?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.studentName}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs sm:text-sm">{item.className}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm">{item.examName}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm tabular-nums">{item.marksObtained}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs sm:text-sm tabular-nums">{item.totalMarks}</td>
                <td className="py-3.5 px-4 font-bold text-purple-700 text-xs sm:text-sm tabular-nums">{item.percentage.toFixed(1)}%</td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.gradeBg}`}>
                    {item.grade}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${item.medalBg}`}>
                    {item.medal}
                  </span>
                </td>

                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => downloadStudentReport(item.studentName, item.examName)}
                      className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      title="View Scorecard"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => downloadStudentReport(item.studentName, item.examName)}
                      className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      title="Download Merit Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLE PAGINATION FOOTER */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-600">
        <div>
          Showing 1 to {meritList.length} of{" "}
          <span className="font-bold text-amber-600">{totalRecordsCount.toLocaleString()}</span> merit students
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer ${
              currentPage === 1 ? "bg-[#6332ec] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
