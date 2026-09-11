"use client";

import React, { useState } from "react";
import { ArrowUp, ArrowDown, Eye } from "lucide-react";
import { topSchoolsData } from "./mockData";
import TopPerformingSchoolsModal from "./TopPerformingSchoolsModal";

export default function ReportsTopPerformingSchoolsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between h-full font-sans">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Top Performing Schools
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
            >
              Full Report
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-2 w-8">#</th>
                  <th className="py-2.5 px-2">School Name</th>
                  <th className="py-2.5 px-2">Students</th>
                  <th className="py-2.5 px-2">Avg. Score</th>
                  <th className="py-2.5 px-2">Tests</th>
                  <th className="py-2.5 px-2 text-center">Trend</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {topSchoolsData.map((school) => (
                  <tr
                    key={school.rank}
                    onClick={() => setIsModalOpen(true)}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-2 font-bold text-slate-500">{school.rank}</td>
                    <td className="py-3 px-2 font-bold text-slate-900">{school.schoolName}</td>
                    <td className="py-3 px-2 font-bold text-slate-800">{school.studentsCount}</td>
                    <td className="py-3 px-2 font-extrabold text-slate-900">{school.avgScore}</td>
                    <td className="py-3 px-2 font-bold text-slate-700">{school.testsCount}</td>
                    <td className="py-3 px-2 text-center">
                      {school.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-emerald-600 inline-block stroke-[3]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-rose-500 inline-block stroke-[3]" />
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                        title="View Top Performing Schools Report"
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
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
            <span>View all schools report</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Top Performing Schools Modal */}
      <TopPerformingSchoolsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
