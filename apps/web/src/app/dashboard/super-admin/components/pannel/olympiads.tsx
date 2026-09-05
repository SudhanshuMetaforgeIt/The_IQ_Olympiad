"use client";

import React from "react";
import { Trophy, Search, Plus } from "lucide-react";

export default function OlympiadsPanel() {
  const olympiadList = [
    { id: "1", name: "International Math Olympiad (IMO)", category: "Mathematics", duration: "60 mins", liveExams: 2, totalRegistrations: 4250, status: "Active" },
    { id: "2", name: "Science Olympiad Foundation (SOF)", category: "Science", duration: "60 mins", liveExams: 1, totalRegistrations: 3890, status: "Active" },
    { id: "3", name: "National Cyber Olympiad (NCO)", category: "Computer Science", duration: "45 mins", liveExams: 1, totalRegistrations: 2150, status: "Active" },
    { id: "4", name: "International English Olympiad (IEO)", category: "English", duration: "45 mins", liveExams: 1, totalRegistrations: 1840, status: "Active" },
    { id: "5", name: "General Knowledge Olympiad (SKGKO)", category: "General Knowledge", duration: "45 mins", liveExams: 1, totalRegistrations: 1250, status: "Active" },
  ];

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            Olympiads & Exams
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Configure Olympiad competitions, question banks, and live exam schedules
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Olympiad</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Olympiad competition..."
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Olympiad Name</th>
                <th className="py-3 px-3">Subject / Category</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3 text-right">Live Exams</th>
                <th className="py-3 px-3 text-right">Total Registrations</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {olympiadList.map((oly) => (
                <tr key={oly.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{oly.name}</td>
                  <td className="py-3.5 px-3 text-purple-700 font-bold">{oly.category}</td>
                  <td className="py-3.5 px-3 text-slate-500">{oly.duration}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-pink-600">{oly.liveExams}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-800">{oly.totalRegistrations.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                      {oly.status}
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

