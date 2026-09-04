"use client";

import React from "react";
import { Download, Eye, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { practiceSeriesData } from "./mockData";

export function PracticeSeriesOverviewTable() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Practice Series Overview
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
              <th className="py-3 px-3">Series Name</th>
              <th className="py-3 px-3">Code</th>
              <th className="py-3 px-3">Class</th>
              <th className="py-3 px-3">Participants</th>
              <th className="py-3 px-3">Attempts</th>
              <th className="py-3 px-3">Participation Rate</th>
              <th className="py-3 px-3">Average Score</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            {practiceSeriesData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-3 font-bold text-slate-500">{row.id}</td>
                <td className="py-3.5 px-3 font-bold text-slate-900">{row.name}</td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">{row.olympiad}</td>
                <td className="py-3.5 px-3 text-slate-600 font-medium">{row.classLevel}</td>
                <td className="py-3.5 px-3 text-slate-800 font-bold">{row.participants}</td>
                <td className="py-3.5 px-3 text-slate-800 font-bold">{row.attempts}</td>
                <td className="py-3.5 px-3 font-extrabold text-emerald-600">{row.participationRate}</td>
                <td className="py-3.5 px-3 text-slate-800 font-semibold">{row.avgScore}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-purple-200 bg-purple-50/80 text-[#3B1EAE] flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <p className="text-xs sm:text-sm font-bold text-[#3B1EAE]">
          Showing 1 to 8 of 8 series
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
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 cursor-not-allowed"
            disabled
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
