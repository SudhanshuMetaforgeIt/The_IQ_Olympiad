"use client";

import React from "react";
import { TrendingUp, Search, Download } from "lucide-react";

export default function ResultsPanel() {
  const resultList = [
    { id: "1", exam: "IMO Round 1", category: "Mathematics", publishedDate: "14 May 2025", totalEvaluated: 1245, passRate: "92%", topScorer: "Arjun Mehta (98%)" },
    { id: "2", exam: "SOF Science Level 1", category: "Science", publishedDate: "13 May 2025", totalEvaluated: 962, passRate: "88%", topScorer: "Priya Sharma (96%)" },
    { id: "3", exam: "Cyber Olympiad 2025", category: "Computer Science", publishedDate: "12 May 2025", totalEvaluated: 765, passRate: "86%", topScorer: "Rohan Verma (95%)" },
    { id: "4", exam: "English Olympiad 2025", category: "English", publishedDate: "11 May 2025", totalEvaluated: 632, passRate: "90%", topScorer: "Ananya Gupta (97%)" },
    { id: "5", exam: "GK Olympiad 2025", category: "General Knowledge", publishedDate: "10 May 2025", totalEvaluated: 592, passRate: "85%", topScorer: "Kavya Patel (94%)" },
  ];

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Exam Results & Scorecards
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Review performance metrics, percentile ranks, and published scorecard reports
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export All Results</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search exam or scorecard..."
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Exam Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Published Date</th>
                <th className="py-3 px-3 text-right">Evaluated</th>
                <th className="py-3 px-3 text-right">Pass Rate</th>
                <th className="py-3 px-3 text-right">Top Scorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {resultList.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{res.exam}</td>
                  <td className="py-3.5 px-3 text-purple-700 font-bold">{res.category}</td>
                  <td className="py-3.5 px-3 text-slate-500">{res.publishedDate}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-800">{res.totalEvaluated.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-600">{res.passRate}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-900">{res.topScorer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

