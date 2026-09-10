"use client";

import React, { useState } from "react";
import { olympiadParticipationData } from "./mockData";
import FullParticipationReportModal from "./FullParticipationReportModal";

export default function ReportsParticipationByOlympiad() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 flex flex-col justify-between h-full font-sans">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Participation by Olympiad
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
            >
              Full Report
            </button>
          </div>

          {/* Table / Progress Bars */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-2">Olympiad</th>
                  <th className="py-2.5 px-2">Students</th>
                  <th className="py-2.5 px-2 text-right">Participation (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {olympiadParticipationData.map((item) => (
                  <tr
                    key={item.olympiadName}
                    onClick={() => setIsModalOpen(true)}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-2 font-bold text-slate-900">{item.olympiadName}</td>
                    <td className="py-3 px-2 font-bold text-slate-800">{item.studentsCount}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-purple-600 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentageValue}%` }}
                          />
                        </div>
                        <span className="font-extrabold text-slate-900 min-w-[50px] text-right">
                          {item.participationPercentage}
                        </span>
                      </div>
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
            <span>View full participation report</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Full Participation Report Modal */}
      <FullParticipationReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
