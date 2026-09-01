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
            <tr className="border-b border-slate-100 text-micro font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">STUDENT NAME</th>
              <th className="py-4 px-4">STUDENT ID</th>
              <th className="py-4 px-4">CLASS</th>
              <th className="py-4 px-4">EXAM NAME</th>
              <th className="py-4 px-4">SCHEDULE</th>
              <th className="py-4 px-4">REGISTRATION DATE</th>
              <th className="py-4 px-4">STATUS</th>
              <th className="py-4 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-table font-normal text-slate-700">
            {registrations.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Student Name with Avatar */}
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
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-body">{item.studentName}</span>
                    </div>
                  </div>
                </td>

                {/* Student ID Column */}
                <td className="py-4 px-4 font-bold text-purple-700 text-table tabular-nums">
                  {item.studentId}
                </td>

                {/* Class */}
                <td className="py-4 px-4 font-bold text-slate-800 text-table">{item.className}</td>

                {/* Exam Name */}
                <td className="py-4 px-4 font-bold text-slate-900 text-table">{item.examName}</td>

                {/* Schedule */}
                <td className="py-4 px-4 text-slate-600 text-table font-medium">{item.schedule}</td>

                {/* Registration Date */}
                <td className="py-4 px-4 text-slate-500 text-table">{item.registrationDate}</td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-badge font-bold ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors" title="Edit Registration">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
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
      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-slate-500">
        <div>
          Showing 1 to {registrations.length} of{" "}
          <span className="font-bold text-purple-700">
            {activeCard === "pending" ? "221" : totalRecordsCount.toLocaleString()}
          </span>{" "}
          {activeCard === "pending" ? "pending registrations" : "registrations"}
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
            onClick={() => setCurrentPage(3)}
            className="w-8 h-8 rounded-lg font-medium text-caption text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg font-medium text-caption text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer">
            {activeCard === "pending" ? "28" : "203"}
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
