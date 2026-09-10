"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export interface ParticipationByOlympiadRecord {
  id: number;
  olympiadName: string;
  classNum: string;
  registeredStudents: string;
  appearedStudents: string;
  participationRate: string;
}

export const participationRateByOlympiadData: ParticipationByOlympiadRecord[] = [
  {
    id: 1,
    olympiadName: "IMO - Mathematics",
    classNum: "Class 8",
    registeredStudents: "2,456",
    appearedStudents: "1,872",
    participationRate: "76.41%",
  },
  {
    id: 2,
    olympiadName: "NSO - Science",
    classNum: "Class 9",
    registeredStudents: "7,210",
    appearedStudents: "5,983",
    participationRate: "82.95%",
  },
  {
    id: 3,
    olympiadName: "IEO - English",
    classNum: "Class 6",
    registeredStudents: "6,347",
    appearedStudents: "5,126",
    participationRate: "80.79%",
  },
  {
    id: 4,
    olympiadName: "Mock Test - 1",
    classNum: "Class 10",
    registeredStudents: "5,842",
    appearedStudents: "4,707",
    participationRate: "80.62%",
  },
  {
    id: 5,
    olympiadName: "Olympiad Practice Test",
    classNum: "Class 7",
    registeredStudents: "4,256",
    appearedStudents: "3,412",
    participationRate: "80.23%",
  },
];

export default function ReportsParticipationRateByOlympiadTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col w-full font-sans">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Participation Rate by Olympiad
        </h3>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">Olympiad Name</th>
              <th className="py-3.5 px-4">Class</th>
              <th className="py-3.5 px-4">Registered Students</th>
              <th className="py-3.5 px-4">Appeared Students</th>
              <th className="py-3.5 px-4">Participation Rate</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {participationRateByOlympiadData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-500">{item.id}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{item.olympiadName}</td>
                <td className="py-3.5 px-4 text-slate-800 font-extrabold">{item.classNum}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{item.registeredStudents}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{item.appearedStudents}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-600">{item.participationRate}</td>
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
        <div>Showing 1 to 5 of 8,965 tests</div>

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
              1793
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
