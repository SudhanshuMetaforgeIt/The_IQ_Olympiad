"use client";

import React, { useState, useEffect } from "react";
import { STUDENT_PROFILE } from "../Common/mockData";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { ExamRegistrationModal, ExamRegistrationData } from "../Common/ExamRegistrationModal";
import { PerformanceModal } from "../Common/PerformanceModal";
import { OLYMPIAD_EXAMS } from "./Olympiad/olympiadData";
import { OlympiadTabs } from "./Olympiad/OlympiadTabs";
import { OlympiadCard } from "./Olympiad/OlympiadCard";
import { OlympiadBottomBanner } from "./Olympiad/OlympiadBottomBanner";
import type { FilterTab } from "./Olympiad/types";

interface PanelProps {
  activeTab?: string;
  initialFilterTab?: FilterTab;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export default function OlympiadPanel({
  activeTab = "olympiad",
  initialFilterTab = "all",
  onSelectTab,
}: PanelProps) {
  const [filterTab, setFilterTab] = useState<FilterTab>(initialFilterTab || "all");
  const [cyberCountdown, setCyberCountdown] = useState("01:25:30");
  const [selectedExamForRegistration, setSelectedExamForRegistration] = useState<ExamRegistrationData | null>(null);
  const [registeredExamIds, setRegisteredExamIds] = useState<number[]>([1]); // Science Olympiad registered by default
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialFilterTab) {
      setFilterTab(initialFilterTab);
    }
  }, [initialFilterTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    let totalSec = 1 * 3600 + 25 * 60 + 30;
    const interval = setInterval(() => {
      if (totalSec > 0) {
        totalSec--;
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        setCyberCountdown(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCompleteRegistration = (examId: number) => {
    setRegisteredExamIds((prev) => (prev.includes(examId) ? prev : [...prev, examId]));
    const registeredExam = OLYMPIAD_EXAMS.find((e) => e.id === examId);
    showToast(`Successfully registered for ${registeredExam?.title || "Olympiad"}!`);
  };

  const filteredExams = OLYMPIAD_EXAMS.filter((exam) => {
    if (filterTab === "all") return true;
    if (filterTab === "registered") return registeredExamIds.includes(exam.id);
    return exam.status === filterTab;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
              <span className="text-emerald-400 text-base">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main White Card Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Header Filter Tabs Row */}
            <OlympiadTabs
              filterTab={filterTab}
              onSelectTab={setFilterTab}
              registeredCount={registeredExamIds.length}
            />

            {/* List of Olympiad Exams */}
            {filteredExams.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredExams.map((exam) => (
                  <OlympiadCard
                    key={exam.id}
                    exam={exam}
                    isRegistered={registeredExamIds.includes(exam.id)}
                    cyberCountdown={cyberCountdown}
                    onRegister={setSelectedExamForRegistration}
                    onViewResults={() => setIsPerformanceModalOpen(true)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto text-xl">
                  🎯
                </div>
                <h3 className="text-base font-black text-slate-900">No registered exams yet</h3>
                <p className="text-xs font-semibold text-slate-400 max-w-sm mx-auto">
                  Browse through upcoming Olympiad challenges and register to appear on this list.
                </p>
                <button
                  type="button"
                  onClick={() => setFilterTab("all")}
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 transition cursor-pointer shadow-2xs"
                >
                  Browse All Olympiads
                </button>
              </div>
            )}
          </div>

          {/* Bottom Notification Bar */}
          <OlympiadBottomBanner />
        </main>
      </div>

      {/* Registration Modal Popup */}
      <ExamRegistrationModal
        isOpen={!!selectedExamForRegistration}
        onClose={() => setSelectedExamForRegistration(null)}
        exam={selectedExamForRegistration}
        onCompleteRegistration={handleCompleteRegistration}
      />

      {/* Performance & Results Modal Popup */}
      <PerformanceModal
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
      />
    </div>
  );
}
