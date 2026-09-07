"use client";

import React, { useState, useMemo } from "react";
import { X, Download, Printer, Search, ArrowUp, ArrowDown, Award, Users } from "lucide-react";

export interface ParticipationReportRecord {
  id: string;
  olympiadName: string;
  category: string;
  classNum: string;
  registeredStudents: number;
  appearedStudents: number;
  participationRate: number;
  completionRate: number;
  trend: "up" | "down";
}

export const fullParticipationData: ParticipationReportRecord[] = [
  {
    id: "PART-01",
    olympiadName: "IMO - Mathematics",
    category: "Mathematics",
    classNum: "Class 10",
    registeredStudents: 3450,
    appearedStudents: 2980,
    participationRate: 86.37,
    completionRate: 94.2,
    trend: "up",
  },
  {
    id: "PART-02",
    olympiadName: "IMO - Mathematics",
    category: "Mathematics",
    classNum: "Class 8",
    registeredStudents: 2890,
    appearedStudents: 2450,
    participationRate: 84.77,
    completionRate: 92.8,
    trend: "up",
  },
  {
    id: "PART-03",
    olympiadName: "NSO - Science",
    category: "Science",
    classNum: "Class 9",
    registeredStudents: 2650,
    appearedStudents: 2180,
    participationRate: 82.26,
    completionRate: 91.5,
    trend: "up",
  },
  {
    id: "PART-04",
    olympiadName: "NSO - Science",
    category: "Science",
    classNum: "Class 7",
    registeredStudents: 2340,
    appearedStudents: 1890,
    participationRate: 80.76,
    completionRate: 89.4,
    trend: "down",
  },
  {
    id: "PART-05",
    olympiadName: "IEO - English",
    category: "English",
    classNum: "Class 10",
    registeredStudents: 2120,
    appearedStudents: 1650,
    participationRate: 77.83,
    completionRate: 88.0,
    trend: "up",
  },
  {
    id: "PART-06",
    olympiadName: "IEO - English",
    category: "English",
    classNum: "Class 6",
    registeredStudents: 1850,
    appearedStudents: 1410,
    participationRate: 76.22,
    completionRate: 87.2,
    trend: "down",
  },
  {
    id: "PART-07",
    olympiadName: "IGKO - General Knowledge",
    category: "General Knowledge",
    classNum: "Class 7",
    registeredStudents: 1740,
    appearedStudents: 1280,
    participationRate: 73.56,
    completionRate: 85.1,
    trend: "up",
  },
  {
    id: "PART-08",
    olympiadName: "IGKO - General Knowledge",
    category: "General Knowledge",
    classNum: "Class 5",
    registeredStudents: 1520,
    appearedStudents: 1090,
    participationRate: 71.71,
    completionRate: 83.9,
    trend: "down",
  },
  {
    id: "PART-09",
    olympiadName: "REAS - Reasoning Aptitude",
    category: "Reasoning",
    classNum: "Class 8",
    registeredStudents: 1480,
    appearedStudents: 1020,
    participationRate: 68.92,
    completionRate: 82.0,
    trend: "up",
  },
  {
    id: "PART-10",
    olympiadName: "REAS - Reasoning Aptitude",
    category: "Reasoning",
    classNum: "Class 6",
    registeredStudents: 1320,
    appearedStudents: 870,
    participationRate: 65.91,
    completionRate: 80.4,
    trend: "down",
  },
];

interface FullParticipationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullParticipationReportModal({
  isOpen,
  onClose,
}: FullParticipationReportModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOlympiad, setSelectedOlympiad] = useState("All");

  const filteredData = useMemo(() => {
    return fullParticipationData.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.olympiadName.toLowerCase().includes(q) ||
        item.classNum.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesOlympiad =
        selectedOlympiad === "All" ||
        item.olympiadName.toLowerCase().includes(selectedOlympiad.toLowerCase());

      return matchesSearch && matchesOlympiad;
    });
  }, [searchQuery, selectedOlympiad]);

  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Olympiad Name",
      "Category",
      "Class",
      "Registered Students",
      "Appeared Students",
      "Participation Rate (%)",
      "Completion Rate (%)",
      "Trend",
    ];

    const rows = filteredData.map((item) => [
      item.id,
      `"${item.olympiadName}"`,
      `"${item.category}"`,
      `"${item.classNum}"`,
      item.registeredStudents,
      item.appearedStudents,
      `${item.participationRate}%`,
      `${item.completionRate}%`,
      item.trend.toUpperCase(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Full_Olympiad_Participation_Report.csv";
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
              <Award className="w-3.5 h-3.5 text-purple-300" />
              <span>Full Participation Analytics</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
              Academic Year 2025 - 2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Olympiad Participation Report
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-2xl">
            Complete turnout breakdown comparing registered vs appeared students and completion rates by exam & class.
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
              placeholder="Search by Olympiad or class..."
              className="w-full bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "IMO", "NSO", "IEO", "IGKO", "REAS"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedOlympiad(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 border ${
                  selectedOlympiad === item
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {item === "All" ? "All Subjects" : item}
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
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Olympiad Subject</th>
                  <th className="py-3 px-4 text-center">Class</th>
                  <th className="py-3 px-4 text-center">Registered</th>
                  <th className="py-3 px-4 text-center">Appeared</th>
                  <th className="py-3 px-4 text-center">Turnout Rate</th>
                  <th className="py-3 px-4 text-center">Completion Rate</th>
                  <th className="py-3 px-4 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">
                      No participation records match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-purple-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        #{idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-xs shrink-0">
                            {item.olympiadName.substring(0, 3)}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm">
                              {item.olympiadName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                          {item.classNum}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {item.registeredStudents.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-purple-700">
                        {item.appearedStudents.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-extrabold text-emerald-600">
                            {item.participationRate.toFixed(1)}%
                          </span>
                          <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden hidden md:block">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${item.participationRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                        {item.completionRate.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.trend === "up" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Up</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-bold text-xs">
                            <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Down</span>
                          </span>
                        )}
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
            <span>Print Report</span>
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
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Participation CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
