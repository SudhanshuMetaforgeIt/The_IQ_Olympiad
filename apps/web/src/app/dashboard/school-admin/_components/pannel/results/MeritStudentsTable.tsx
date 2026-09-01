"use client";

import React from "react";
import { Eye, Download, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { ResultRecord } from "./types";

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
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
      {/* Table Title */}
      <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-body">Merit & Rank Holders List</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-micro font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">RANK</th>
              <th className="py-4 px-6">STUDENT NAME</th>
              <th className="py-4 px-4">CLASS</th>
              <th className="py-4 px-4">EXAM NAME</th>
              <th className="py-4 px-4">MARKS OBTAINED</th>
              <th className="py-4 px-4">TOTAL MARKS</th>
              <th className="py-4 px-4">PERCENTAGE</th>
              <th className="py-4 px-4">GRADE</th>
              <th className="py-4 px-4">ACHIEVEMENT / MEDAL</th>
              <th className="py-4 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-table font-normal text-slate-700">
            {meritList.map((item) => (
              <tr key={item.id || item.rank} className="hover:bg-slate-50/80 transition-colors">
                {/* Rank Badge */}
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-black text-caption border ${
                    item.rank === 1 ? "bg-amber-400 text-slate-900 border-amber-500" :
                    item.rank === 2 ? "bg-slate-300 text-slate-900 border-slate-400" :
                    item.rank === 3 ? "bg-amber-700 text-white border-amber-800" :
                    "bg-slate-100 text-slate-700 border-slate-200"
                  }`}>
                    #{item.rank}
                  </span>
                </td>

                {/* Student Name with Profile Image */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3.5">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.studentName}
                        className="w-9 h-9 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className={`w-9 h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-bold text-caption shrink-0 border border-slate-200/60`}>
                        {item.studentName?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-bold text-slate-900 text-body">{item.studentName}</span>
                  </div>
                </td>

                {/* Class */}
                <td className="py-4 px-4 font-bold text-slate-800 text-table">{item.className}</td>

                {/* Exam Name */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table">{item.examName}</td>

                {/* Marks Obtained */}
                <td className="py-4 px-4 font-extrabold text-slate-900 text-table tabular-nums">
                  {item.marksObtained}
                </td>

                {/* Total Marks */}
                <td className="py-4 px-4 font-medium text-slate-700 text-table tabular-nums">{item.totalMarks}</td>

                {/* Percentage */}
                <td className="py-4 px-4 font-extrabold text-purple-700 text-table tabular-nums">
                  {item.percentage.toFixed(1)}%
                </td>

                {/* Grade */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-badge font-bold ${item.gradeBg}`}>
                    {item.grade}
                  </span>
                </td>

                {/* Achievement Badge */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-badge font-bold border ${item.medalBg}`}>
                    {item.medal}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer" title="View Scorecard">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer" title="Download Merit Certificate">
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
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-slate-500">
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
            className={`w-8 h-8 rounded-lg font-bold text-caption flex items-center justify-center cursor-pointer ${
              currentPage === 1 ? "bg-[#6B46C1] text-white" : "text-slate-600 hover:bg-slate-50"
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
