"use client";

import React from "react";
import { Download, Eye, Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { upcomingExamsOverviewData } from "./mockData";

export function UpcomingExamsOverviewTable() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Upcoming Exams
        </h3>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              <th className="py-3 px-3 w-10">#</th>
              <th className="py-3 px-3">Exam Name</th>
              <th className="py-3 px-3">Code</th>
              <th className="py-3 px-3">Class</th>
              <th className="py-3 px-3">Exam Date</th>
              <th className="py-3 px-3">Registrations</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {upcomingExamsOverviewData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-3 font-bold text-slate-500">{row.id}</td>
                <td className="py-3.5 px-3 font-bold text-slate-900">{row.name}</td>
                <td className="py-3.5 px-3 text-slate-800 font-bold">{row.olympiad}</td>
                <td className="py-3.5 px-3 text-slate-800 font-semibold">{row.classLevel}</td>
                <td className="py-3.5 px-3 text-slate-900 font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3B1EAE] stroke-[2.2] shrink-0" />
                  <span>{row.date}</span>
                </td>
                <td className="py-3.5 px-3 font-bold text-[#3B1EAE]">{row.registrations}</td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-purple-200 bg-purple-50/60 text-[#3B1EAE] hover:bg-purple-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#3B1EAE] stroke-[2.2]" />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <p className="text-xs sm:text-sm font-bold text-[#3B1EAE]">
          Showing 1 to 6 of 18 exams
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 cursor-not-allowed"
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-[#3B1EAE] text-white text-xs sm:text-sm font-black flex items-center justify-center shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-slate-50"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-slate-50"
          >
            3
          </button>
          <span className="text-slate-400 font-bold text-xs">...</span>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="relative inline-flex items-center ml-2">
            <select className="appearance-none bg-white border border-slate-200 rounded-xl px-3 py-1.5 pr-7 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer focus:outline-none hover:border-slate-300">
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
              <option value="50">50 / page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
