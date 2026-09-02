"use client";

import React, { useState, useEffect } from "react";
import { STUDENT_PROFILE } from "./../Common/mockData";
import { Sidebar } from "./../Common/Sidebar";
import { HeaderBar } from "./../Common/HeaderBar";
import {
  CertificatesSection,
  MyBadgesSection,
  CertificatesCouponsSection,
} from "./Certificates/index";

type CertificateSubTab = "certificates" | "badges" | "coupons";

interface CertificatesPanelProps {
  activeTab?: string;
  initialSubTab?: CertificateSubTab;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

const parseSubTab = (tab?: string): CertificateSubTab => {
  if (tab === "badges" || tab === "coupons") {
    return tab;
  }
  return "certificates";
};

export default function CertificatesPanel({
  activeTab = "certificates",
  initialSubTab = "certificates",
  onSelectTab,
}: CertificatesPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<CertificateSubTab>(parseSubTab(initialSubTab));

  useEffect(() => {
    setActiveSubTab(parseSubTab(initialSubTab));
  }, [initialSubTab]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
                AWARDS & RECOGNITION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeSubTab === "badges"
                  ? "My Badges & Honors 🏅"
                  : activeSubTab === "coupons"
                  ? "Coupon & Discount Codes 🏷️"
                  : "My Certificates 📜"}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {activeSubTab === "badges"
                  ? "Track your earned achievement badges and progress towards unlocking new milestones."
                  : activeSubTab === "coupons"
                  ? "Exclusive discount vouchers and registration coupons for upcoming Olympiad exams."
                  : "Access, preview, and download your accredited certificates for completed Olympiads."}
              </p>
            </div>
          </div>

          {/* 3 Sub-Tabs Navigation (Certificates, My Badges, Coupon Codes) */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-fit max-w-full overflow-x-auto">
            {/* Certificates Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveSubTab("certificates");
                onSelectTab?.("certificates", "certificates");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "certificates"
                  ? "bg-white text-violet-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>📜</span>
              <span>Certificates</span>
            </button>

            {/* My Badges Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveSubTab("badges");
                onSelectTab?.("certificates", "badges");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "badges"
                  ? "bg-white text-violet-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🏅</span>
              <span>My Badges</span>
              <span className="bg-violet-100 text-violet-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                2
              </span>
            </button>

            {/* Coupon Codes Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveSubTab("coupons");
                onSelectTab?.("certificates", "coupons");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "coupons"
                  ? "bg-white text-violet-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🏷️</span>
              <span>Coupon Codes</span>
            </button>
          </div>

          {/* Tab Content Display */}
          {activeSubTab === "badges" ? (
            <MyBadgesSection studentName={STUDENT_PROFILE.name.split(" ")[0]} />
          ) : activeSubTab === "coupons" ? (
            <CertificatesCouponsSection />
          ) : (
            <CertificatesSection />
          )}
        </main>
      </div>
    </div>
  );
}
