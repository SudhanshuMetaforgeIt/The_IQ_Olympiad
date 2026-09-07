"use client";

import React from "react";
import { Eye, Download } from "lucide-react";
import { CertificateRecord } from "./types";

interface CertificatesStudentsTableProps {
  data: CertificateRecord[];
  onViewCertificate?: (student: CertificateRecord) => void;
  onDownloadCertificate?: (student: CertificateRecord) => void;
}

export default function CertificatesStudentsTable({
  data,
  onViewCertificate,
  onDownloadCertificate,
}: CertificatesStudentsTableProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
          1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs">
          2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs">
          3
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
        {rank}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Issued":
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-200/60">
            Issued
          </span>
        );
      case "Pending":
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-200/60">
            Pending
          </span>
        );
      case "Not Issued":
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold border border-rose-200/60">
            Not Issued
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
            {status}
          </span>
        );
    }
  };

  const avatarColors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-amber-100 text-amber-800",
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Top 10 Students (Based on Exam Results)
        </h3>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Registration ID</th>
              <th className="py-3 px-4">Roll No.</th>
              <th className="py-3 px-4">Exam / Olympiad</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Percentage</th>
              <th className="py-3 px-4">Certificate Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
            {data.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 text-center">
                  <div className="flex justify-center">{getRankBadge(item.rank)}</div>
                </td>
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
                <td className="py-3.5 px-4 text-slate-600 font-medium">{item.registrationId}</td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{item.rollNo}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{item.examName}</td>
                <td className="py-3.5 px-4 text-slate-700 font-bold">{item.classNum}</td>
                <td className="py-3.5 px-4 font-bold">
                  <span className="text-amber-600">{item.score.split(" / ")[0]}</span>
                  <span className="text-slate-400 font-normal"> / 100</span>
                </td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-600">{item.percentage}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{item.certificateType}</td>
                <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewCertificate?.(item)}
                      title="View Certificate"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownloadCertificate?.(item)}
                      title="Download Certificate"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
