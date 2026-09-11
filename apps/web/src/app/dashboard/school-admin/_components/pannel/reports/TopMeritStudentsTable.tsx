"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";
import { MeritStudentItem } from "./types";

interface TopMeritStudentsTableProps {
  students: MeritStudentItem[];
  selectedStudentId?: string;
  onSelectStudent?: (student: MeritStudentItem) => void;
}

export const TopMeritStudentsTable: React.FC<TopMeritStudentsTableProps> = ({
  students,
  selectedStudentId,
  onSelectStudent,
}) => {
  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-amber-500 text-white font-black shadow-xs";
      case 2:
        return "bg-slate-300 text-slate-800 font-bold";
      case 3:
        return "bg-amber-700 text-white font-bold";
      case 4:
        return "bg-emerald-100 text-emerald-700 font-bold";
      case 5:
        return "bg-teal-100 text-teal-700 font-bold";
      case 6:
        return "bg-rose-100 text-rose-700 font-bold";
      case 7:
        return "bg-orange-100 text-orange-700 font-bold";
      case 8:
        return "bg-amber-100 text-amber-700 font-bold";
      case 9:
        return "bg-amber-800/80 text-white font-bold";
      case 10:
        return "bg-slate-800 text-white font-bold text-xs";
      default:
        return "bg-slate-100 text-slate-600 font-bold";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-2xs space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Top 10 Merit Students <span className="text-slate-500 font-bold text-sm">(Overall)</span>
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3">RANK</th>
              <th className="py-3 px-3">STUDENT NAME</th>
              <th className="py-3 px-3">CLASS</th>
              <th className="py-3 px-3">EXAM</th>
              <th className="py-3 px-3">SCORE (%)</th>
              <th className="py-3 px-3">MARKS</th>
              <th className="py-3 px-3">PUBLISHED ON</th>
              <th className="py-3 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {students.slice(0, 10).map((item) => {
              const isSelected = selectedStudentId === item.id || item.rank === 1;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectStudent?.(item)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-purple-50/50" : "hover:bg-slate-50/70"
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getRankBadgeStyle(
                        item.rank
                      )}`}
                    >
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-sm sm:text-base text-slate-900">{item.studentName}</td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{item.class}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-semibold">{item.examName}</td>
                  <td className="py-3.5 px-3 font-black text-sm sm:text-base text-[#7c3aed]">
                    {item.scorePercentage.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    {item.marksObtained} / {item.totalMarks}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">{item.publishedOn}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent?.(item);
                      }}
                      className="p-1.5 text-slate-400 hover:text-purple-600 transition"
                    >
                      <Eye className="w-5 h-5 text-[#7c3aed]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
