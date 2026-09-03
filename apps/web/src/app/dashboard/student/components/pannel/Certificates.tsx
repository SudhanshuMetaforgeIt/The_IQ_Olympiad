"use client";

import React, { useState } from "react";
import { StudentPanelChrome } from "./../Common/StudentPanelChrome";
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
  const [activeSubTab, setActiveSubTab] = useState<CertificateSubTab>(() =>
    parseSubTab(initialSubTab)
  );
  const [prevInitialSubTab, setPrevInitialSubTab] = useState(initialSubTab);

  // Sync local tab when parent-driven initialSubTab changes (React-recommended render adjustment).
  if (initialSubTab !== prevInitialSubTab) {
    setPrevInitialSubTab(initialSubTab);
    setActiveSubTab(parseSubTab(initialSubTab));
  }

  return (
    <StudentPanelChrome activeTab={activeTab} onSelectTab={onSelectTab}>
      {({ student, activeTab, onSelectTab }) => (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={student} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={student} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black text-violet-600 uppercase tracking-widest block mb-0.5">
                AWARDS & RECOGNITION
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeSubTab === "badges"
                  ? "My Badges & Honors 🏅"
                  : activeSubTab === "coupons"
                  ? "Coupon & Discount Codes 🏷️"
                  : "My Certificates 📜"}
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {activeSubTab === "badges"
                  ? "Track your earned achievement badges and progress towards unlocking new milestones."
                  : activeSubTab === "coupons"
                  ? "Exclusive discount vouchers and registration coupons for upcoming Olympiad exams."
                  : "Access, preview, and download your accredited certificates for completed Olympiads."}
              </p>
            </div>
          </div>

          {/* 3 Sub-Tabs Navigation (Certificates, My Badges, Coupon Codes) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl w-fit max-w-full overflow-x-auto">
            {/* Certificates Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveSubTab("certificates");
                onSelectTab?.("certificates", "certificates");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "certificates"
                  ? "bg-white text-violet-700 shadow-2xs"
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "badges"
                  ? "bg-white text-violet-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🏅</span>
              <span>My Badges</span>
              <span className="bg-violet-100 text-violet-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                0
              </span>
            </button>

            {/* Coupon Codes Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveSubTab("coupons");
                onSelectTab?.("certificates", "coupons");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === "coupons"
                  ? "bg-white text-violet-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🏷️</span>
              <span>Coupon Codes</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                0
              </span>
            </button>
          </div>

          {/* Tab Content Display */}
          {activeSubTab === "badges" ? (
            <MyBadgesSection studentName={student.name.split(" ")[0] || student.name} />
          ) : activeSubTab === "coupons" ? (
            <CertificatesCouponsSection />
          ) : (
            <CertificatesSection />
          )}
        </main>
      </div>
    </div>
      )}
    </StudentPanelChrome>
  );
}
