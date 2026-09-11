"use client";

import React from "react";
import { Edit2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { ExamRegistrationRecord, ActiveCardType } from "./types";

interface ExamRegistrationTableProps {
  registrations: ExamRegistrationRecord[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalRecordsCount: number;
  activeCard?: ActiveCardType;
}

export function ExamRegistrationTable({
  registrations,
  currentPage,
  setCurrentPage,
  totalRecordsCount,
  activeCard,
}: ExamRegistrationTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Registered":
        return "bg-emerald-100/80 text-emerald-700";
      case "Pending":
        return "bg-amber-100/80 text-amber-700";
      case "Closed":
        return "bg-purple-100/90 text-purple-700";
      case "Cancelled":
        return "bg-red-100/80 text-red-600";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/70">
              <th className="py-4.5 px-6">STUDENT NAME</th>
              <th className="py-4.5 px-4">STUDENT ID</th>
              <th className="py-4.5 px-4">CLASS</th>
              <th className="py-4.5 px-4">EXAM NAME</th>
              <th className="py-4.5 px-4">SCHEDULE</th>
              <th className="py-4.5 px-4">REGISTRATION DATE</th>
              <th className="py-4.5 px-4">STATUS</th>
              <th className="py-4.5 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {registrations.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Student Name with Avatar */}
                <td className="py-4.5 px-6">
                  <div className="flex items-center space-x-3.5">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.studentName}
                        className="w-10 h-10 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${item.avatarBg} flex items-center justify-center font-semibold text-xs shrink-0 border border-slate-200/60`}>
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">{item.studentName}</span>
                  </div>
                </td>

                {/* Student ID Column */}
                <td className="py-4.5 px-4 font-semibold text-purple-700 text-sm sm:text-base tabular-nums">
                  {item.studentId}
                </td>

                {/* Class */}
                <td className="py-4.5 px-4 font-normal text-slate-700 text-sm sm:text-base">{item.className}</td>

                {/* Exam Name */}
                <td className="py-4.5 px-4 font-medium text-slate-900 text-sm sm:text-base">{item.examName}</td>

                {/* Schedule */}
                <td className="py-4.5 px-4 text-slate-600 text-sm sm:text-base font-normal">{item.schedule}</td>

                {/* Registration Date */}
                <td className="py-4.5 px-4 text-slate-500 text-sm sm:text-base font-normal">{item.registrationDate}</td>

                {/* Status */}
                <td className="py-4.5 px-4">
                  <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-4.5 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer" title="Edit Registration">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TABLE PAGINATION FOOTER */}
      <div className="p-4.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base font-normal text-slate-500">
        <div>
          Showing 1 to {registrations.length} of{" "}
          <span className="font-semibold text-purple-700">
            {activeCard === "pending" ? "221" : totalRecordsCount.toLocaleString()}
          </span>{" "}
          {activeCard === "pending" ? "pending registrations" : "registrations"}
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-9 h-9 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center cursor-pointer ${
              currentPage === 1 ? "bg-[#6332ec] text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className="w-9 h-9 rounded-xl font-medium text-sm sm:text-base text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className="w-9 h-9 rounded-xl font-medium text-sm sm:text-base text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            3
          </button>
          <span className="px-1.5 text-slate-400 font-medium">...</span>
          <button className="w-9 h-9 rounded-xl font-medium text-sm sm:text-base text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer">
            {activeCard === "pending" ? "28" : "203"}
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
