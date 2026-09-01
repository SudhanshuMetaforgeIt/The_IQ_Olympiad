"use client";

import React, { useState, useEffect } from "react";
import { STUDENT_PROFILE } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";
import { ExamRegistrationModal, ExamRegistrationData } from "../Commonn/ExamRegistrationModal";
import { PerformanceModal } from "../Commonn/PerformanceModal";
import { OLYMPIAD_EXAMS } from "./Olympiad/olympiadData";
import { OlympiadTabs } from "./Olympiad/OlympiadTabs";
import { OlympiadCard } from "./Olympiad/OlympiadCard";
import { OlympiadBottomBanner } from "./Olympiad/OlympiadBottomBanner";
import type { FilterTab } from "./Olympiad/types";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function OlympiadPanel({ activeTab = "olympiad", onSelectTab }: PanelProps) {
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [cyberCountdown, setCyberCountdown] = useState("01:25:30");
  const [selectedExamForRegistration, setSelectedExamForRegistration] = useState<ExamRegistrationData | null>(null);
  const [registeredExamIds, setRegisteredExamIds] = useState<number[]>([]);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

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
  };

  const filteredExams = OLYMPIAD_EXAMS.filter((exam) => {
    if (filterTab === "all") return true;
    return exam.status === filterTab;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar student={STUDENT_PROFILE} />

        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Main White Card Container */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header Filter Tabs Row */}
            <OlympiadTabs filterTab={filterTab} onSelectTab={setFilterTab} />

            {/* List of Olympiad Exams */}
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
