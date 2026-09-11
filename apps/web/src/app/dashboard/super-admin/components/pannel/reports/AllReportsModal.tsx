"use client";

import React, { useState, useMemo } from "react";
import { X, Download, Printer, Search, FileText, CheckCircle2, Eye, Calendar, HardDrive } from "lucide-react";

export interface SystemReportItem {
  id: string;
  reportName: string;
  type: string;
  generatedOn: string;
  fileSize: string;
  recordsCount: string;
  status: "Ready" | "Processing" | "Archived";
  description: string;
}

export const allSystemReportsData: SystemReportItem[] = [
  {
    id: "REP-001",
    reportName: "Overview Report",
    type: "Overview",
    generatedOn: "12 May 2026, 10:30 AM",
    fileSize: "2.4 MB",
    recordsCount: "35,217 records",
    status: "Ready",
    description: "High-level summary of total registrations, completed tests, and average scores.",
  },
  {
    id: "REP-002",
    reportName: "School Performance Report",
    type: "Performance",
    generatedOn: "12 May 2026, 09:15 AM",
    fileSize: "4.8 MB",
    recordsCount: "1,248 schools",
    status: "Ready",
    description: "Detailed performance breakdown of top and participating educational institutions.",
  },
  {
    id: "REP-003",
    reportName: "Student Performance Report",
    type: "Student",
    generatedOn: "11 May 2026, 08:45 AM",
    fileSize: "8.1 MB",
    recordsCount: "35,217 students",
    status: "Ready",
    description: "Individual student test scores, subject percentiles, and merit rankings.",
  },
  {
    id: "REP-004",
    reportName: "Olympiad Wise Report",
    type: "Olympiad",
    generatedOn: "11 May 2026, 06:20 PM",
    fileSize: "3.2 MB",
    recordsCount: "5 subjects",
    status: "Ready",
    description: "Comparison metrics across IMO (Math), NSO (Science), IEO (English), and IGKO (GK).",
  },
  {
    id: "REP-005",
    reportName: "Participation Report",
    type: "Participation",
    generatedOn: "11 May 2026, 05:10 PM",
    fileSize: "1.9 MB",
    recordsCount: "41,663 applicants",
    status: "Ready",
    description: "Turnout statistics comparing registered students with appearing test-takers.",
  },
  {
    id: "REP-006",
    reportName: "State-Wise Analytics Report",
    type: "Demographics",
    generatedOn: "10 May 2026, 04:30 PM",
    fileSize: "3.6 MB",
    recordsCount: "28 states",
    status: "Ready",
    description: "Geographic distribution and performance averages across Indian states & cities.",
  },
  {
    id: "REP-007",
    reportName: "Subject Average Scores Audit",
    type: "Academic",
    generatedOn: "10 May 2026, 02:15 PM",
    fileSize: "2.8 MB",
    recordsCount: "8,965 tests",
    status: "Ready",
    description: "Academic score audit detailing highest, lowest, and mean performance scores.",
  },
  {
    id: "REP-008",
    reportName: "Class-Wise Participation Summary",
    type: "Enrollment",
    generatedOn: "09 May 2026, 11:00 AM",
    fileSize: "1.7 MB",
    recordsCount: "Classes 1 to 12",
    status: "Ready",
    description: "Student cohort breakdown showing grade-level engagement trends.",
  },
  {
    id: "REP-009",
    reportName: "Annual Examination Master Report",
    type: "Annual",
    generatedOn: "08 May 2026, 05:45 PM",
    fileSize: "12.4 MB",
    recordsCount: "Master Dataset",
    status: "Ready",
    description: "Consolidated platform-wide academic year master data export.",
  },
  {
    id: "REP-010",
    reportName: "Top Merit Holders & Rankers",
    type: "Merit",
    generatedOn: "07 May 2026, 03:20 PM",
    fileSize: "2.1 MB",
    recordsCount: "1,500 achievers",
    status: "Ready",
    description: "National, state, and school rank lists with award and certificate eligibility.",
  },
];

interface AllReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllReportsModal({ isOpen, onClose }: AllReportsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredReports = useMemo(() => {
    return allSystemReportsData.filter((report) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        report.reportName.toLowerCase().includes(q) ||
        report.type.toLowerCase().includes(q) ||
        report.description.toLowerCase().includes(q);

      const matchesType =
        selectedType === "All" ||
        report.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  if (!isOpen) return null;

  const downloadReportFile = (report: SystemReportItem) => {
    const content = `=====================================================
THE IQ OLYMPIAD - SYSTEM GENERATED REPORT
=====================================================
Report ID       : ${report.id}
Report Title    : ${report.reportName}
Category / Type : ${report.type}
Generated On    : ${report.generatedOn}
Data Records    : ${report.recordsCount}
File Size       : ${report.fileSize}
Status          : ${report.status}
-----------------------------------------------------
Description:
${report.description}
-----------------------------------------------------
Verified by: The IQ Olympiad Super Admin System
Timestamp   : ${new Date().toISOString()}
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

  const downloadAllReportsSummary = () => {
    const headers = ["ID", "Report Name", "Type", "Generated On", "File Size", "Records", "Status"];
    const rows = filteredReports.map((r) => [
      r.id,
      `"${r.reportName}"`,
      `"${r.type}"`,
      `"${r.generatedOn}"`,
      r.fileSize,
      `"${r.recordsCount}"`,
      r.status,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "All_System_Reports_Summary.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200 font-sans">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl overflow-hidden transform transition-all my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 text-white relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-300" />
              <span>Platform Reports Repository</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
              <span>10 Reports Available</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            All System Generated Reports
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-2xl">
            Access, inspect, and download analytical reports on platform turnout, student performance, schools, and olympiad results.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 px-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by name, type..."
              className="w-full bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "Overview", "Performance", "Student", "Olympiad", "Participation"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 border ${
                  selectedType === type
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse min-w-[760px] text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">ID</th>
                  <th className="py-3 px-4">Report Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Generated On</th>
                  <th className="py-3 px-4 text-center">Size</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                      No reports match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-purple-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        {report.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm">
                              {report.reportName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5 max-w-sm line-clamp-1">
                              {report.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                          {report.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{report.generatedOn}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-600">
                        {report.fileSize}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{report.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => downloadReportFile(report)}
                          title="Download this Report"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print List</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={downloadAllReportsSummary}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download All Reports Summary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
