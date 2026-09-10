"use client";

import React, { useState, useMemo } from "react";
import { X, Download, Printer, Search, ArrowUp, ArrowDown, Trophy } from "lucide-react";

export interface TopPerformingSchoolDetail {
  rank: number;
  schoolName: string;
  city: string;
  state: string;
  studentsCount: number;
  avgScore: number;
  testsCount: number;
  participationRate: number;
  topOlympiad: string;
  trend: "up" | "down";
}

export const detailedTopSchoolsData: TopPerformingSchoolDetail[] = [
  {
    rank: 1,
    schoolName: "Delhi Public School",
    city: "New Delhi",
    state: "Delhi",
    studentsCount: 2451,
    avgScore: 78.45,
    testsCount: 645,
    participationRate: 92.45,
    topOlympiad: "IMO - Mathematics",
    trend: "up",
  },
  {
    rank: 2,
    schoolName: "St. Xavier's School",
    city: "Mumbai",
    state: "Maharashtra",
    studentsCount: 1872,
    avgScore: 76.32,
    testsCount: 512,
    participationRate: 89.72,
    topOlympiad: "NSO - Science",
    trend: "up",
  },
  {
    rank: 3,
    schoolName: "Kendriya Vidyalaya No. 1",
    city: "Pune",
    state: "Maharashtra",
    studentsCount: 1623,
    avgScore: 74.18,
    testsCount: 498,
    participationRate: 86.22,
    topOlympiad: "IMO - Mathematics",
    trend: "down",
  },
  {
    rank: 4,
    schoolName: "Ryan International School",
    city: "Bengaluru",
    state: "Karnataka",
    studentsCount: 1456,
    avgScore: 72.95,
    testsCount: 421,
    participationRate: 88.14,
    topOlympiad: "IEO - English",
    trend: "up",
  },
  {
    rank: 5,
    schoolName: "Pathways School",
    city: "Gurugram",
    state: "Haryana",
    studentsCount: 1218,
    avgScore: 71.23,
    testsCount: 389,
    participationRate: 85.09,
    topOlympiad: "NSO - Science",
    trend: "down",
  },
  {
    rank: 6,
    schoolName: "DAV Public School",
    city: "Chandigarh",
    state: "Chandigarh",
    studentsCount: 1123,
    avgScore: 70.85,
    testsCount: 350,
    participationRate: 84.6,
    topOlympiad: "IMO - Mathematics",
    trend: "up",
  },
  {
    rank: 7,
    schoolName: "Modern School, Barakhamba",
    city: "New Delhi",
    state: "Delhi",
    studentsCount: 1095,
    avgScore: 70.15,
    testsCount: 342,
    participationRate: 83.9,
    topOlympiad: "NSO - Science",
    trend: "up",
  },
  {
    rank: 8,
    schoolName: "The Mother's International School",
    city: "New Delhi",
    state: "Delhi",
    studentsCount: 980,
    avgScore: 69.8,
    testsCount: 310,
    participationRate: 82.5,
    topOlympiad: "IEO - English",
    trend: "up",
  },
  {
    rank: 9,
    schoolName: "Bombay Scottish School",
    city: "Mumbai",
    state: "Maharashtra",
    studentsCount: 945,
    avgScore: 69.1,
    testsCount: 295,
    participationRate: 81.7,
    topOlympiad: "IMO - Mathematics",
    trend: "down",
  },
  {
    rank: 10,
    schoolName: "National Public School",
    city: "Bengaluru",
    state: "Karnataka",
    studentsCount: 890,
    avgScore: 68.45,
    testsCount: 280,
    participationRate: 80.2,
    topOlympiad: "IGKO - GK",
    trend: "up",
  },
];

interface TopPerformingSchoolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TopPerformingSchoolsModal({
  isOpen,
  onClose,
}: TopPerformingSchoolsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOlympiad, setSelectedOlympiad] = useState("All");

  const filteredSchools = useMemo(() => {
    return detailedTopSchoolsData.filter((school) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        school.schoolName.toLowerCase().includes(query) ||
        school.city.toLowerCase().includes(query) ||
        school.state.toLowerCase().includes(query);

      const matchesOlympiad =
        selectedOlympiad === "All" || school.topOlympiad.includes(selectedOlympiad);

      return matchesSearch && matchesOlympiad;
    });
  }, [searchQuery, selectedOlympiad]);

  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    const headers = [
      "Rank",
      "School Name",
      "City",
      "State",
      "Students Appeared",
      "Average Score (%)",
      "Tests Conducted",
      "Participation Rate (%)",
      "Top Olympiad",
      "Trend",
    ];

    const rows = filteredSchools.map((s) => [
      s.rank,
      `"${s.schoolName}"`,
      `"${s.city}"`,
      `"${s.state}"`,
      s.studentsCount,
      `${s.avgScore}%`,
      s.testsCount,
      `${s.participationRate}%`,
      `"${s.topOlympiad}"`,
      s.trend.toUpperCase(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Top_Performing_Schools_Report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
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
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Top Performance Analytics</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
              Academic Year 2025 - 2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Top Performing Schools Report
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-2xl">
            Detailed performance analysis, academic scores, and student turnout across leading educational institutions.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 px-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school name, city, state..."
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "IMO", "NSO", "IEO", "IGKO"].map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedOlympiad(subject)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 border ${
                  selectedOlympiad === subject
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {subject === "All" ? "All Olympiads" : subject}
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
                  <th className="py-3 px-4 w-12 text-center">Rank</th>
                  <th className="py-3 px-4">School Details</th>
                  <th className="py-3 px-4 text-center">Students</th>
                  <th className="py-3 px-4 text-center">Avg. Score</th>
                  <th className="py-3 px-4 text-center">Tests Conducted</th>
                  <th className="py-3 px-4 text-center">Participation</th>
                  <th className="py-3 px-4">Top Olympiad</th>
                  <th className="py-3 px-4 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">
                      No schools match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => {
                    const isGold = school.rank === 1;
                    const isSilver = school.rank === 2;
                    const isBronze = school.rank === 3;

                    return (
                      <tr
                        key={school.rank}
                        className="hover:bg-purple-50/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black shadow-2xs ${
                              isGold
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : isSilver
                                ? "bg-slate-200 text-slate-800 border border-slate-300"
                                : isBronze
                                ? "bg-orange-100 text-orange-800 border border-orange-300"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{school.rank}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm">
                              {school.schoolName}
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                              {school.city}, {school.state}
                            </p>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                          {school.studentsCount.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-black border border-purple-200 text-xs">
                            {school.avgScore.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                          {school.testsCount}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-extrabold text-emerald-600">
                              {school.participationRate.toFixed(1)}%
                            </span>
                            <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden hidden md:block">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${school.participationRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                            {school.topOlympiad}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {school.trend === "up" ? (
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
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
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
