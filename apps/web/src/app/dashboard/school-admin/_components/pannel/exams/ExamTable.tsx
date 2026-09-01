"use client";

import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { ExamRecord } from "./types";

interface ExamTableProps {
  exams: ExamRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalExamsCount: number;
}

export function ExamTable({
  exams,
  currentPage,
  setCurrentPage,
  totalExamsCount,
}: ExamTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-emerald-100/80 text-emerald-700";
      case "Upcoming":
        return "bg-blue-100/80 text-blue-700";
      case "Completed":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-micro font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">EXAM NAME</th>
              <th className="py-4 px-4">CODE</th>
              <th className="py-4 px-4">CLASSES</th>
              <th className="py-4 px-4">EXAM DATE</th>
              <th className="py-4 px-4">SCHEDULE</th>
              <th className="py-4 px-4">DURATION</th>
              <th className="py-4 px-4">REGISTRATION ENDS</th>
              <th className="py-4 px-4">STATUS</th>
              <th className="py-4 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-table font-normal text-slate-700">
            {exams.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Exam Name */}
                <td className="py-4 px-6">
                  <span className="font-bold text-blue-700 text-body cursor-pointer hover:underline">
                    {item.examName}
                  </span>
                </td>

                {/* CODE */}
                <td className="py-4 px-4 font-bold text-[#1E1B4B] text-table">{item.examCode}</td>

                {/* Classes */}
                <td className="py-4 px-4 text-slate-600 text-table tabular-nums font-medium">{item.classes}</td>

                {/* Exam Date */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table">{item.examDate}</td>

                {/* Schedule */}
                <td className="py-4 px-4 text-slate-600 text-table font-medium">{item.schedule}</td>

                {/* Duration */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table">{item.duration}</td>

                {/* Registration Ends */}
                <td className="py-4 px-4 text-table">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-800 font-medium">{item.registrationEnds}</span>
                    {item.daysLeft && (
                      <span className="text-caption text-slate-400 font-normal">[{item.daysLeft}]</span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-badge font-bold ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors" title="Edit Exam">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Delete Exam">
                      <Trash2 className="w-4 h-4" />
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
          Showing 1 to {exams.length} of <span className="font-bold text-purple-700">{totalExamsCount}</span> exams
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
            onClick={() => setCurrentPage(2)}
            className="w-8 h-8 rounded-lg font-medium text-caption text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            2
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
