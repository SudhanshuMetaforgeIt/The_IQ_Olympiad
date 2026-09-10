"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export interface TestConductedRecord {
  id: number;
  testName: string;
  category: string;
  classNum: string;
  studentsAppeared: string;
  attempts: string;
  participationRate: string;
  averageScore: string;
  conductedOn: string;
}

export const topTestsConductedData: TestConductedRecord[] = [
  {
    id: 1,
    testName: "IMO - Mathematics",
    category: "IMO",
    classNum: "Class 8",
    studentsAppeared: "8,963",
    attempts: "10,245",
    participationRate: "89.72%",
    averageScore: "72.45%",
    conductedOn: "10 May 2026",
  },
  {
    id: 2,
    testName: "NSO - Science",
    category: "NSO",
    classNum: "Class 9",
    studentsAppeared: "7,210",
    attempts: "8,125",
    participationRate: "85.21%",
    averageScore: "68.32%",
    conductedOn: "08 May 2026",
  },
  {
    id: 3,
    testName: "IEO - English",
    category: "IEO",
    classNum: "Class 6",
    studentsAppeared: "6,347",
    attempts: "7,125",
    participationRate: "82.14%",
    averageScore: "66.19%",
    conductedOn: "05 May 2026",
  },
  {
    id: 4,
    testName: "Mock Test - 1",
    category: "Mock Test",
    classNum: "Class 10",
    studentsAppeared: "5,842",
    attempts: "6,980",
    participationRate: "78.62%",
    averageScore: "64.87%",
    conductedOn: "02 May 2026",
  },
  {
    id: 5,
    testName: "Olympiad Practice Test",
    category: "Practice Test",
    classNum: "Class 7",
    studentsAppeared: "4,256",
    attempts: "5,105",
    participationRate: "75.42%",
    averageScore: "60.31%",
    conductedOn: "01 May 2026",
  },
];

export default function ReportsTopTestsConductedTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col w-full font-sans">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Top Tests Conducted
        </h3>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">Test Name</th>
              <th className="py-3.5 px-4">Olympiad / Category</th>
              <th className="py-3.5 px-4">Class</th>
              <th className="py-3.5 px-4">Students Appeared</th>
              <th className="py-3.5 px-4">Attempts</th>
              <th className="py-3.5 px-4">Participation Rate</th>
              <th className="py-3.5 px-4">Average Score</th>
              <th className="py-3.5 px-4">Conducted On</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {topTestsConductedData.map((test) => (
              <tr key={test.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-500">{test.id}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{test.testName}</td>
                <td className="py-3.5 px-4 text-slate-600 font-bold">{test.category}</td>
                <td className="py-3.5 px-4 text-slate-800 font-extrabold">{test.classNum}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{test.studentsAppeared}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{test.attempts}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-600">{test.participationRate}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-800">{test.averageScore}</td>
                <td className="py-3.5 px-4 font-medium text-slate-600">{test.conductedOn}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    title="View Test Details"
                    className="w-8 h-8 rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer mx-auto shadow-2xs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <div>Showing 1 to 5 of 8,965 tests</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 1 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 2 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 3 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              3
            </button>
            <span className="px-1.5 text-slate-400 font-bold">...</span>
            <button type="button" className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer">
              1793
            </button>
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-1.5 pr-8 focus:outline-none cursor-pointer">
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
