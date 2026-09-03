"use client";

import React from "react";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { ResultRecord } from "./types";
import { downloadStudentReport } from "./exportUtils";

interface QualifiedStudentsTableProps {
  qualifiedStudents: ResultRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalRecordsCount: number;
}

export function QualifiedStudentsTable({
  qualifiedStudents,
  currentPage,
  setCurrentPage,
  totalRecordsCount = 1418,
}: QualifiedStudentsTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs font-black text-slate-600 uppercase tracking-wider bg-slate-50/70">
              <th className="py-3.5 px-6">STUDENT NAME</th>
              <th className="py-3.5 px-4">CLASS</th>
              <th className="py-3.5 px-4">EXAM NAME</th>
              <th className="py-3.5 px-4">MARKS OBTAINED</th>
              <th className="py-3.5 px-4">TOTAL MARKS</th>
              <th className="py-3.5 px-4">PERCENTAGE</th>
              <th className="py-3.5 px-4">GRADE</th>
              <th className="py-3.5 px-4">RESULT</th>
              <th className="py-3.5 px-4">PUBLISHED ON</th>
              <th className="py-3.5 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {qualifiedStudents.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
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
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.studentName}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs sm:text-sm">{item.className}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm">{item.examName}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm tabular-nums">{item.marksObtained}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs sm:text-sm tabular-nums">{item.totalMarks}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm tabular-nums">{item.percentage.toFixed(1)}%</td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.gradeBg}`}>
                    {item.grade}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-700">
                    {item.resultStatus}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-600 text-xs sm:text-sm font-semibold">{item.publishedOn}</td>

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
                      title="Download Report"
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
          Showing 1 to {qualifiedStudents.length} of{" "}
          <span className="font-bold text-emerald-700">{totalRecordsCount.toLocaleString()}</span> qualified students
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
            onClick={() => setCurrentPage(2)}
            className="w-8 h-8 rounded-lg font-semibold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className="w-8 h-8 rounded-lg font-semibold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg font-semibold text-xs sm:text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer">
            142
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
