"use client";

import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import { recentReportsData } from "./mockData";
import AllReportsModal from "./AllReportsModal";

export default function ReportsRecentReportsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = (e: React.MouseEvent, report: (typeof recentReportsData)[0]) => {
    e.stopPropagation();
    const content = `=====================================================
THE IQ OLYMPIAD - SYSTEM GENERATED REPORT
=====================================================
Report ID       : ${report.id}
Report Title    : ${report.reportName}
Category / Type : ${report.type}
Generated On    : ${report.generatedOn}
Status          : Completed / Ready
Verified by     : The IQ Olympiad Super Admin System
=====================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.reportName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between h-full font-sans">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Reports
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
            >
              Full List
            </button>
          </div>

          {/* Table / List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-2">Report Name</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">Generated On</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {recentReportsData.map((report) => (
                  <tr
                    key={report.id}
                    onClick={() => setIsModalOpen(true)}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-2 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>{report.reportName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-500">{report.type}</td>
                    <td className="py-3 px-2 font-medium text-slate-600">{report.generatedOn}</td>
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, report)}
                        title="Download Report"
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View all reports</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* All Reports Modal */}
      <AllReportsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
