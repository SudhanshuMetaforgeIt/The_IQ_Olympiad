"use client";

import React from "react";
import { Award, Search, Download, CheckCircle2 } from "lucide-react";

export default function CertificatesPanel() {
  const certificateList = [
    { id: "1", type: "Gold Award Certificate", exam: "IMO Round 1", recipient: "Arjun Mehta", issuedDate: "15 May 2025", verificationId: "CERT-IMO-9941" },
    { id: "2", type: "Merit Certificate", exam: "SOF Science Level 1", recipient: "Priya Sharma", issuedDate: "14 May 2025", verificationId: "CERT-SOF-8832" },
    { id: "3", type: "Distinction Certificate", exam: "Cyber Olympiad 2025", recipient: "Rohan Verma", issuedDate: "13 May 2025", verificationId: "CERT-CYB-7723" },
    { id: "4", type: "Participation Certificate", exam: "English Olympiad 2025", recipient: "Ananya Gupta", issuedDate: "12 May 2025", verificationId: "CERT-ENG-6614" },
    { id: "5", type: "Merit Certificate", exam: "GK Olympiad 2025", recipient: "Kavya Patel", issuedDate: "11 May 2025", verificationId: "CERT-GKO-5505" },
  ];

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            Certificates Management
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Issue, verify, and manage official digital certificates of achievement
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Batch Generate</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search recipient or verification ID..."
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Certificate Type</th>
                <th className="py-3 px-3">Exam</th>
                <th className="py-3 px-3">Recipient</th>
                <th className="py-3 px-3">Verification ID</th>
                <th className="py-3 px-3 text-right">Issued Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {certificateList.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-purple-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{cert.type}</span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{cert.exam}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-semibold">{cert.recipient}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-500">{cert.verificationId}</td>
                  <td className="py-3.5 px-3 text-right text-slate-500">{cert.issuedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

