"use client";

import React from "react";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { AppearedStudentRecord } from "./types";
import { downloadStudentReport } from "./exportUtils";

interface AppearedStudentsTableProps {
  appearedStudents: AppearedStudentRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalRecordsCount: number;
}

export function AppearedStudentsTable({
  appearedStudents,
  currentPage,
  setCurrentPage,
  totalRecordsCount = 1624,
}: AppearedStudentsTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      {/* Table Section Title */}
      <div className="px-6 pt-5 pb-3 border-b border-slate-100">
        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Appeared Students List</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs font-black text-slate-600 uppercase tracking-wider bg-slate-50/70">
              <th className="py-3.5 px-6">STUDENT NAME</th>
              <th className="py-3.5 px-4">CLASS</th>
              <th className="py-3.5 px-4">EXAM NAME</th>
              <th className="py-3.5 px-4">REGISTRATION NO.</th>
              <th className="py-3.5 px-4">EXAM DATE</th>
              <th className="py-3.5 px-4">ATTENDANCE</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {appearedStudents.map((item) => (
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
                      <div className={`w-9 h-9 rounded-full ${item.avatarColor} flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200/60`}>
                        {item.avatarInitial}
                      </div>
                    )}
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.studentName}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-semibold text-slate-700 text-xs sm:text-sm">{item.className}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm">{item.examName}</td>
                <td className="py-3.5 px-4 font-bold text-slate-700 text-xs sm:text-sm font-mono">{item.registrationNo}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-600 text-xs sm:text-sm">{item.examDate}</td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.attendanceStatus === "Present"
                        ? "bg-emerald-100/80 text-emerald-700"
                        : "bg-red-100/80 text-red-700"
                    }`}
                  >
                    {item.attendanceStatus}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === "Appeared"
                        ? "bg-emerald-100/80 text-emerald-700"
                        : "bg-red-100/80 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => downloadStudentReport(item.studentName, item.examName)}
                      className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
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
          Showing 1 to {appearedStudents.length} of{" "}
          <span className="font-bold text-[#6332ec]">{totalRecordsCount.toLocaleString()}</span> appeared students
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
            203
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
