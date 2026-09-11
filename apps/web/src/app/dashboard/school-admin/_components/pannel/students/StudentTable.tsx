"use client";

import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { StudentRecord, ActiveCardType } from "./types";

interface StudentTableProps {
  students: StudentRecord[];
  activeCard: ActiveCardType;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function StudentTable({
  students,
  activeCard,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}: StudentTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-4.5 px-6">STUDENT NAME</th>
              <th className="py-4.5 px-4">ADMISSION NO.</th>
              <th className="py-4.5 px-4">ROLL NUMBER</th>
              <th className="py-4.5 px-4">CLASS</th>
              <th className="py-4.5 px-4">SECTION</th>
              <th className="py-4.5 px-4">PHONE</th>
              <th className="py-4.5 px-4">EMAIL</th>
              <th className="py-4.5 px-4">STATUS</th>
              <th className="py-4.5 px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {students.slice(0, itemsPerPage).map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4.5 px-6">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs border border-slate-200 shrink-0"
                    />
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">{student.name}</span>
                  </div>
                </td>
                <td className="py-4.5 px-4 font-normal text-slate-700 text-sm sm:text-base">{student.admissionNo}</td>
                <td className="py-4.5 px-4 font-normal text-slate-700 text-sm sm:text-base tabular-nums">{student.rollNumber}</td>
                <td className="py-4.5 px-4 font-normal text-slate-600 text-sm sm:text-base">{student.className}</td>
                <td className="py-4.5 px-4 font-normal text-slate-600 text-sm sm:text-base">{student.section}</td>
                <td className="py-4.5 px-4 font-normal text-slate-700 text-sm sm:text-base tabular-nums">{student.phone}</td>
                <td className="py-4.5 px-4 font-normal text-slate-500 text-sm sm:text-base">{student.email}</td>
                <td className="py-4.5 px-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-100/80 text-emerald-700">
                    {student.status}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer" title="Edit Student">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer" title="Delete Student">
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
      <div className="p-4.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base font-normal text-slate-500">
        <div>
          Showing 1 to {Math.min(itemsPerPage, students.length)} of{" "}
          <span className="font-semibold text-purple-700">
            {activeCard === "registered" ? "1,792" : "1,842"}
          </span>{" "}
          {activeCard === "registered" ? "registered students (Alphabetical order)" : "students"}
        </div>

        <div className="flex items-center space-x-3">
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
              {activeCard === "registered" ? "180" : "231"}
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {activeCard === "registered" && (
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="appearance-none bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 py-2 pl-3.5 pr-8 rounded-xl cursor-pointer focus:outline-none"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
