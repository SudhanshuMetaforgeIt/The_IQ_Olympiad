"use client";

import React from "react";
import { BarChart3, Download } from "lucide-react";

export default function ReportsPanel() {
  const reportSummary = [
    { title: "Total Revenue Generated", value: "₹45,82,000", change: "+14.2% vs last month" },
    { title: "Platform Active Rate", value: "98.4%", change: "+2.1% uptime" },
    { title: "Avg. Test Completion", value: "94.8%", change: "+1.5% completion" },
  ];

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Analytics & Platform Reports
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Deep dive into platform usage metrics, school participation, and financial statistics
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Download PDF Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reportSummary.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-500">{item.title}</p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">{item.value}</h3>
            <span className="text-xs font-extrabold text-emerald-600 mt-2 inline-block">
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

