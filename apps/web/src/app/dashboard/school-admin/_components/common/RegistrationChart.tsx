"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Download } from "lucide-react";
import { RegistrationStatus } from "../../_types/dashboard";

interface RegistrationChartProps {
  data: RegistrationStatus;
}

export function RegistrationChart({ data }: RegistrationChartProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const registeredOffset = 0;
  const registeredStroke = (data.registeredPercentage / 100) * circumference;
  const pendingOffset = registeredStroke;
  const pendingStroke = (data.pendingPercentage / 100) * circumference;
  const rejectedOffset = registeredStroke + pendingStroke;
  const rejectedStroke = (data.rejectedPercentage / 100) * circumference;

  const classBreakdown = [
    { grade: "Class 7", total: 316, registered: 280, pending: 32, rejected: 4 },
    { grade: "Class 8", total: 335, registered: 295, pending: 35, rejected: 5 },
    { grade: "Class 9", total: 356, registered: 310, pending: 40, rejected: 6 },
    { grade: "Class 10", total: 369, registered: 320, pending: 42, rejected: 7 },
    { grade: "Class 11", total: 252, registered: 210, pending: 36, rejected: 6 },
    { grade: "Class 12", total: 214, registered: 206, pending: 36, rejected: 6 },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full font-sans">
        <div>
          <h2 className="text-[#0F172A] text-xl mb-6 font-extrabold">Exam Registration Status</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
            <Link href="/dashboard/school-admin/students" className="relative w-56 h-56 sm:w-60 sm:h-60 shrink-0 flex items-center justify-center cursor-pointer group">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r={radius} className="stroke-slate-100" strokeWidth="24" fill="transparent" />
                <circle cx="110" cy="110" r={radius} className="stroke-emerald-500 transition-all duration-1000" strokeWidth="24" fill="transparent" strokeDasharray={`${registeredStroke} ${circumference}`} strokeDashoffset={-registeredOffset} strokeLinecap="round" />
                <circle cx="110" cy="110" r={radius} className="stroke-amber-500 transition-all duration-1000" strokeWidth="24" fill="transparent" strokeDasharray={`${pendingStroke} ${circumference}`} strokeDashoffset={-pendingOffset} strokeLinecap="round" />
                <circle cx="110" cy="110" r={radius} className="stroke-red-500 transition-all duration-1000" strokeWidth="24" fill="transparent" strokeDasharray={`${rejectedStroke} ${circumference}`} strokeDashoffset={-rejectedOffset} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform p-4">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums tracking-tight">{data.totalStudents.toLocaleString()}</span>
                <span className="text-sm font-extrabold text-[#6332ec] mt-1 group-hover:underline">Total Students</span>
              </div>
            </Link>

            <div className="space-y-4 w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start space-x-4 text-base">
                <div className="flex items-center space-x-2.5"><span className="w-3.5 h-3.5 rounded-full bg-emerald-500" /><span className="font-extrabold text-slate-700">Registered</span></div>
                <span className="font-black text-slate-900 tabular-nums">{data.registeredCount.toLocaleString()} ({data.registeredPercentage}%)</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start space-x-4 text-base">
                <div className="flex items-center space-x-2.5"><span className="w-3.5 h-3.5 rounded-full bg-amber-500" /><span className="font-extrabold text-slate-700">Pending</span></div>
                <span className="font-black text-slate-900 tabular-nums">{data.pendingCount} ({data.pendingPercentage}%)</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start space-x-4 text-base">
                <div className="flex items-center space-x-2.5"><span className="w-3.5 h-3.5 rounded-full bg-red-500" /><span className="font-extrabold text-slate-700">Rejected</span></div>
                <span className="font-black text-slate-900 tabular-nums">{data.rejectedCount} ({data.rejectedPercentage}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4">
          <button onClick={() => setShowDetailsModal(true)} className="inline-flex items-center space-x-2 text-sm font-black text-purple-700 hover:text-purple-900 transition-colors cursor-pointer">
            <span>View Full Report</span>
            <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Exam Registration Full Details</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">Class-wise registration breakdown & status summary.</p>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-purple-50 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-purple-700">Total Students</p><p className="text-xl font-black text-purple-900 mt-1">1,842</p></div>
              <div className="bg-emerald-50 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-emerald-700">Registered</p><p className="text-xl font-black text-emerald-900 mt-1">1,621 (88%)</p></div>
              <div className="bg-amber-50 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-amber-700">Pending</p><p className="text-xl font-black text-amber-900 mt-1">221 (12%)</p></div>
              <div className="bg-red-50 p-3.5 rounded-2xl"><p className="text-xs font-extrabold text-red-700">Rejected</p><p className="text-xl font-black text-red-900 mt-1">34 (2%)</p></div>
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-900 mb-3">Class-wise Distribution</h4>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-extrabold uppercase border-b border-slate-100">
                    <tr><th className="p-3">Class</th><th className="p-3">Total</th><th className="p-3">Registered</th><th className="p-3">Pending</th><th className="p-3">Rejected</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold text-slate-800">
                    {classBreakdown.map((row) => (
                      <tr key={row.grade} className="hover:bg-slate-50/60">
                        <td className="p-3 font-black text-purple-900">{row.grade}</td><td className="p-3">{row.total}</td><td className="p-3 text-emerald-600">{row.registered}</td><td className="p-3 text-amber-600">{row.pending}</td><td className="p-3 text-red-600">{row.rejected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button onClick={() => setShowDetailsModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-sm hover:bg-slate-50 cursor-pointer">Close</button>
              <button onClick={() => alert("Full Report PDF downloaded successfully!")} className="px-5 py-2.5 rounded-xl bg-[#6332ec] text-white font-extrabold text-sm flex items-center gap-2 hover:bg-purple-700 cursor-pointer shadow-md">
                <Download className="w-4 h-4" /><span>Export Report PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
