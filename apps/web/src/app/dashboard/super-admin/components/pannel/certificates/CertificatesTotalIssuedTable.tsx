"use client";

import React, { useState } from "react";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { CertificateRecord } from "./types";

interface CertificatesTotalIssuedTableProps {
  data: CertificateRecord[];
  onViewCertificate?: (student: CertificateRecord) => void;
  onDownloadCertificate?: (student: CertificateRecord) => void;
}

export default function CertificatesTotalIssuedTable({
  data,
  onViewCertificate,
  onDownloadCertificate,
}: CertificatesTotalIssuedTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const avatarColors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-amber-100 text-amber-800",
    "bg-emerald-100 text-emerald-800",
    "bg-indigo-100 text-indigo-700",
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col w-full">
      {/* Table Header */}
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Total Certificates Issued (17,101)
        </h3>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">
          Showing all certificates issued across all types.
        </p>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12">#</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Registration ID</th>
              <th className="py-3.5 px-4">Roll No.</th>
              <th className="py-3.5 px-4">Exam / Olympiad</th>
              <th className="py-3.5 px-4">Class</th>
              <th className="py-3.5 px-4">Certificate Type</th>
              <th className="py-3.5 px-4">Issue Date</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {data.map((item, idx) => {
              const isMerit = item.certificateType === "Merit";
              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-700">{item.rank}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full ${
                          avatarColors[idx % avatarColors.length]
                        } flex items-center justify-center font-bold text-[11px] shrink-0`}
                      >
                        {item.avatarInitials}
                      </div>
                      <span>{item.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{item.registrationId}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{item.rollNo}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.examName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.classNum}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        isMerit
                          ? "bg-emerald-100/80 text-emerald-700"
                          : "bg-blue-100/80 text-blue-700"
                      }`}
                    >
                      {isMerit ? "Merit Certificate" : "Participation Certificate"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">
                    {item.issueDate || "12 May 2026"}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewCertificate?.(item)}
                        title="View Certificate"
                        className="w-8 h-8 rounded-xl border border-purple-200 bg-purple-50/50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDownloadCertificate?.(item)}
                        title="Download Certificate"
                        className="w-8 h-8 rounded-xl border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:text-purple-600 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <div>Showing 1 to 10 of 17,101 certificates</div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
          >
            2
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
          >
            3
          </button>
          <span className="px-2 text-slate-400 font-bold">...</span>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            1711
          </button>
          <button
            type="button"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
