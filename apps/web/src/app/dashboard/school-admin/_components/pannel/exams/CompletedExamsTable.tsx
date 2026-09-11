"use client";

import React from "react";
import { Eye, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { CompletedExamRecord } from "./types";

interface CompletedExamsTableProps {
  completedExams: CompletedExamRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
}

export function CompletedExamsTable({
  completedExams,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}: CompletedExamsTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-micro font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">EXAM / OLYMPIAD NAME</th>
              <th className="py-4 px-4">CODE</th>
              <th className="py-4 px-4">CLASSES</th>
              <th className="py-4 px-4">CATEGORY</th>
              <th className="py-4 px-4">EXAM DATE</th>
              <th className="py-4 px-4">SCHEDULE</th>
              <th className="py-4 px-4">DURATION</th>
              <th className="py-4 px-4">COMPLETED ON</th>
              <th className="py-4 px-4">TOTAL PARTICIPANTS</th>
              <th className="py-4 px-4">STATUS</th>
              <th className="py-4 px-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-table font-normal text-slate-700">
            {completedExams.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Exam / Olympiad Name */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-9 h-9 rounded-full ${item.badgeBg} flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs`}>
                      {item.badgeText}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-body">{item.examName}</h4>
                      <p className="text-caption font-normal text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                </td>

                {/* Code */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table">{item.code}</td>

                {/* Classes */}
                <td className="py-4 px-4 font-medium text-slate-700 text-table tabular-nums">{item.classes}</td>

                {/* Category */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-badge font-bold ${item.categoryBg}`}>
                    {item.category}
                  </span>
                </td>

                {/* Exam Date */}
                <td className="py-4 px-4 font-medium text-slate-700 text-table">{item.examDate}</td>

                {/* Schedule */}
                <td className="py-4 px-4 text-slate-600 text-table font-medium">{item.schedule}</td>

                {/* Duration */}
                <td className="py-4 px-4 text-slate-700 text-table font-medium">{item.duration}</td>

                {/* Completed On */}
                <td className="py-4 px-4 text-slate-600 text-table font-medium">{item.completedOn}</td>

                {/* Total Participants */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table tabular-nums">
                  {item.totalParticipants}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-badge font-bold bg-emerald-100/80 text-emerald-700">
                    Completed
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button className="p-1.5 border border-slate-200 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-full transition-all cursor-pointer" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer" title="More Options">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER PAGINATION */}
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-slate-500">
        <div>
          Showing 1 to {completedExams.length} of <span className="font-bold text-purple-700">5</span> completed exams
        </div>

        <div className="flex items-center space-x-3">
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

          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-lg cursor-pointer focus:outline-none"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
