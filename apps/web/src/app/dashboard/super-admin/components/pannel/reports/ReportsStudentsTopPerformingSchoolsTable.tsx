"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export interface StudentViewSchoolRecord {
  rank: number;
  schoolName: string;
  city: string;
  state: string;
  totalStudents: string;
  testsConducted: string;
  participationRate: string;
  averageScore: string;
  topOlympiad: string;
}

export const studentViewTopSchoolsData: StudentViewSchoolRecord[] = [
  {
    rank: 1,
    schoolName: "Delhi Public School",
    city: "New Delhi",
    state: "Delhi",
    totalStudents: "2,456",
    testsConducted: "628",
    participationRate: "92.45%",
    averageScore: "87.64%",
    topOlympiad: "IMO - Mathematics",
  },
  {
    rank: 2,
    schoolName: "St. Xavier's School",
    city: "Mumbai",
    state: "Maharashtra",
    totalStudents: "1,872",
    testsConducted: "512",
    participationRate: "89.72%",
    averageScore: "85.21%",
    topOlympiad: "NSO - Science",
  },
  {
    rank: 3,
    schoolName: "Ryan International School",
    city: "Bengaluru",
    state: "Karnataka",
    totalStudents: "1,456",
    testsConducted: "421",
    participationRate: "88.14%",
    averageScore: "83.19%",
    topOlympiad: "IEO - English",
  },
  {
    rank: 4,
    schoolName: "Kendriya Vidyalaya No. 1",
    city: "Pune",
    state: "Maharashtra",
    totalStudents: "1,234",
    testsConducted: "389",
    participationRate: "86.22%",
    averageScore: "81.33%",
    topOlympiad: "IMO - Mathematics",
  },
  {
    rank: 5,
    schoolName: "DAV Public School",
    city: "Chandigarh",
    state: "Chandigarh",
    totalStudents: "1,123",
    testsConducted: "351",
    participationRate: "84.95%",
    averageScore: "79.80%",
    topOlympiad: "NSO - Science",
  },
];

export default function ReportsStudentsTopPerformingSchoolsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col w-full font-sans">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
          <span>Top Performing Schools</span>
          <span className="text-purple-600 font-bold text-xs">(By Average Score)</span>
        </h3>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">School Name</th>
              <th className="py-3.5 px-4">City</th>
              <th className="py-3.5 px-4">State</th>
              <th className="py-3.5 px-4">Total Students</th>
              <th className="py-3.5 px-4">Tests Conducted</th>
              <th className="py-3.5 px-4">Participation Rate</th>
              <th className="py-3.5 px-4">Average Score</th>
              <th className="py-3.5 px-4">Top Olympiad</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {studentViewTopSchoolsData.map((school) => (
              <tr key={school.rank} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-500">{school.rank}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{school.schoolName}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{school.city}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{school.state}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{school.totalStudents}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{school.testsConducted}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-600">{school.participationRate}</td>
                <td className="py-3.5 px-4 font-extrabold text-amber-600">{school.averageScore}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{school.topOlympiad}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    title="View Details"
                    className="w-8 h-8 rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer mx-auto shadow-2xs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <div>Showing 1 to 5 of 35,217 students</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 1 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 2 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs ${currentPage === 3 ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              3
            </button>
            <span className="px-1.5 text-slate-400 font-bold">...</span>
            <button type="button" className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer">
              3522
            </button>
            <button type="button" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-1.5 pr-8 focus:outline-none cursor-pointer">
              <option value="10">10 / page</option>
              <option value="25">25 / page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
