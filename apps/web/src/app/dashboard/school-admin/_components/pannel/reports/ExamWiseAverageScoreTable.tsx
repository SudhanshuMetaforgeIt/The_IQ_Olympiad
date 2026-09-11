"use client";

import React from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { AverageScoreExamItem } from "./types";

interface ExamWiseAverageScoreTableProps {
  exams: AverageScoreExamItem[];
  onPreview?: (exam: AverageScoreExamItem) => void;
}

export const ExamWiseAverageScoreTable: React.FC<ExamWiseAverageScoreTableProps> = ({
  exams,
  onPreview,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-2xs space-y-5">
      {/* Title Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Exam Wise Average Score
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3">EXAM NAME</th>
              <th className="py-3 px-3">TOTAL MARKS</th>
              <th className="py-3 px-3">AVERAGE SCORE (%)</th>
              <th className="py-3 px-3">HIGHEST SCORE (%)</th>
              <th className="py-3 px-3">LOWEST SCORE (%)</th>
              <th className="py-3 px-3">EXAM DATE</th>
              <th className="py-3 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {exams.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-4 px-3 font-extrabold text-sm sm:text-base text-slate-900">{item.examName}</td>
                <td className="py-4 px-3 text-slate-600 font-semibold">{item.totalMarks}</td>
                <td className="py-4 px-3 font-extrabold text-sm sm:text-base text-slate-900">
                  {item.averagePercentage.toFixed(1)}%
                </td>
                <td className="py-4 px-3 text-emerald-600 font-extrabold text-sm">
                  {item.highestPercentage.toFixed(1)}%
                </td>
                <td className="py-4 px-3 text-amber-600 font-extrabold text-sm">
                  {item.lowestPercentage.toFixed(1)}%
                </td>
                <td className="py-4 px-3 text-slate-600 font-medium">{item.examDate}</td>
                <td className="py-4 px-3 text-right">
                  <button
                    onClick={() => onPreview?.(item)}
                    title="View details"
                    className="p-1.5 text-slate-400 hover:text-purple-600 transition cursor-pointer"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
        <p className="text-slate-500 font-semibold">
          Showing 1 to {exams.length} of <span className="font-bold text-slate-900">{exams.length}</span> exams
        </p>

        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300 opacity-50 cursor-not-allowed"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>

          <button className="w-9 h-9 rounded-xl font-bold bg-[#7c3aed] text-white shadow-2xs">
            1
          </button>

          <button
            disabled
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300 opacity-50 cursor-not-allowed"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
