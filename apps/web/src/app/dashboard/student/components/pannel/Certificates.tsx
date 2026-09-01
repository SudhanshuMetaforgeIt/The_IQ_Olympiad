"use client";

import React from "react";
import { STUDENT_PROFILE } from "./../Commonn/mockData";
import { Sidebar } from "./../Commonn/Sidebar";
import { HeaderBar } from "./../Commonn/HeaderBar";
import { CertificatesSection } from "./Certificates/CertificatesSection";

interface CertificatesPanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function CertificatesPanel({
  activeTab = "certificates",
  onSelectTab,
}: CertificatesPanelProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar student={STUDENT_PROFILE} />

        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
                AWARDS & CREDENTIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Certificates & Badges 📜
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Access, preview, and download your accredited certificates for completed Olympiads.
              </p>
            </div>
          </div>

          <CertificatesSection />
        </main>
      </div>
    </div>
  );
}
