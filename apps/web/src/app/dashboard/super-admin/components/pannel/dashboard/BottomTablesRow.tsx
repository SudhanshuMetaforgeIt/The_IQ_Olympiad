"use client";

import React from "react";
import { topSchools, activeExamsList } from "./mockData";

interface BottomTablesRowProps {
  onSelectTab?: (tabId: string) => void;
}

export function BottomTablesRow({ onSelectTab }: BottomTablesRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Top Schools Table Card (5 Columns) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Top Schools</h3>
          <button
            type="button"
            onClick={() => onSelectTab?.("schools")}
            className="text-xs sm:text-sm font-bold text-[#3B1EAE] hover:text-purple-900 border border-slate-200 rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 pr-2 w-8">#</th>
                <th className="py-2.5 px-2">School Name</th>
                <th className="py-2.5 px-2 text-right">Students</th>
                <th className="py-2.5 pl-2 text-right">Exams</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {topSchools.map((school) => (
                <tr key={school.rank} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pr-2">
                    <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                      {school.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-900">{school.name}</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{school.students}</td>
                  <td className="py-3 pl-2 text-right font-bold text-slate-800">{school.exams}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Exams (Live Now) Table Card (7 Columns) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Active Exams (Live Now)</h3>
          <button
            type="button"
            onClick={() => onSelectTab?.("olympiads")}
            className="text-xs sm:text-sm font-bold text-[#3B1EAE] hover:text-purple-900 border border-slate-200 rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 pr-2 w-8">#</th>
                <th className="py-2.5 px-2">Exam Name</th>
                <th className="py-2.5 px-2">Code</th>
                <th className="py-2.5 px-2 text-right">Students</th>
                <th className="py-2.5 px-2">Start Time</th>
                <th className="py-2.5 pl-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {activeExamsList.map((exam) => (
                <tr key={exam.rank} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pr-2">
                    <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                      {exam.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-900">{exam.name}</td>
                  <td className="py-3 px-2 text-slate-500 font-medium">{exam.olympiad}</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-800">{exam.students}</td>
                  <td className="py-3 px-2 text-slate-500 font-medium">{exam.time}</td>
                  <td className="py-3 pl-2 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {exam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
