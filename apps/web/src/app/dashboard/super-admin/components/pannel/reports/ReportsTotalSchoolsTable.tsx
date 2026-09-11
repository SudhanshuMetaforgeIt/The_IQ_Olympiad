"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { totalSchoolsDetailedData } from "./mockData";

export default function ReportsTotalSchoolsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col w-full">
      {/* Table Header */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Top Performing Schools <span className="text-xs font-normal text-slate-400">(Average Score)</span>
        </h3>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12">#</th>
              <th className="py-3.5 px-4">School Name</th>
              <th className="py-3.5 px-4">City</th>
              <th className="py-3.5 px-4">State</th>
              <th className="py-3.5 px-4">Total Students</th>
              <th className="py-3.5 px-4">Participation Rate</th>
              <th className="py-3.5 px-4">Average Score</th>
              <th className="py-3.5 px-4">Top Olympiad</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {totalSchoolsDetailedData.map((school) => (
              <tr key={school.rank} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-500">{school.rank}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{school.schoolName}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{school.city}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{school.state}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{school.totalStudents}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-600">{school.participationRate}</td>
                <td className="py-3.5 px-4 font-extrabold text-amber-600">{school.averageScore}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{school.topOlympiad}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    title="View School Details"
                    className="w-8 h-8 rounded-xl border border-purple-200 bg-purple-50/50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer mx-auto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination matching screenshot */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <div>Showing 1 to 5 of 1,248 schools</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs">
              1
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer">
              2
            </button>
            <button type="button" className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer">
              3
            </button>
            <span className="px-2 text-slate-400 font-bold">...</span>
            <button type="button" className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer">
              250
            </button>
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none cursor-pointer">
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
