"use client";

import React, { useState } from "react";
import {
  STUDENT_PROFILE,
  UPCOMING_EXAM,
  DASHBOARD_STATS,
  RECENT_RESULTS,
  PERFORMANCE_METRICS,
  EXAM_TIP,
} from "../Common/mockData";
import type { ExamResultItem } from "../../types";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { UpcomingExamBanner } from "../Common/UpcomingExamBanner";
import { StatsRow } from "../Common/StatsRow";
import { RecentResults } from "../Common/RecentResults";
import { PerformanceOverview } from "../Common/PerformanceOverview";
import { AchievementsCard } from "../Common/AchievementsCard";
import { ExamTipsBanner } from "../Common/ExamTipsBanner";
import { PerformanceModal } from "../Common/PerformanceModal";
import { EarnedBadgesModal } from "../Common/EarnedBadgesModal";
import { SubjectResultModal } from "../Common/SubjectResultModal";
import { ExamInstructionsStep } from "../Common/ExamInstructionsStep";
import { ExamProctoringStep } from "../Common/ExamProctoringStep";
import { ExamLiveInterfaceStep } from "../Common/ExamLiveInterfaceStep";

interface StudentDashboardProps {
  activeTab?: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export default function StudentDashboard({ activeTab = "dashboard", onSelectTab }: StudentDashboardProps) {
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [selectedSubjectResult, setSelectedSubjectResult] = useState<ExamResultItem | null>(null);
  const [activeExamStep, setActiveExamStep] = useState<"instructions" | "proctoring" | "live_exam" | null>(null);

  // Render Full Screen Exam Workspace
  if (activeExamStep === "live_exam") {
    return (
      <ExamLiveInterfaceStep
        onExitExam={() => setActiveExamStep(null)}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Dashboard Canvas */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        {/* Top Header */}
        <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Multi-Step Exam Flow Mode */}
          {activeExamStep === "instructions" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setActiveExamStep(null)}
                className="text-xs font-bold text-violet-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Dashboard
              </button>
              <ExamInstructionsStep
                onStartExam={() => setActiveExamStep("proctoring")}
              />
            </div>
          )}

          {activeExamStep === "proctoring" && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setActiveExamStep("instructions")}
                className="text-xs font-bold text-violet-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to Instructions
              </button>
              <ExamProctoringStep
                onProceedToLiveExam={() => setActiveExamStep("live_exam")}
              />
            </div>
          )}

          {/* Normal Dashboard Overview View */}
          {!activeExamStep && (
            <>
              {/* Upcoming Exam Hero Banner */}
              <UpcomingExamBanner
                exam={UPCOMING_EXAM}
                onViewDetails={() => setIsPerformanceModalOpen(true)}
                onWriteExam={() => onSelectTab?.("exams", "upcoming")}
              />

              {/* Main Grid: Left Analytics & Right Achievements */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
                {/* Left 8 Columns */}
                <div className="xl:col-span-8 space-y-4 sm:space-y-5">
                  {/* Quick Stats Grid */}
                  <StatsRow stats={DASHBOARD_STATS} onSelectTab={onSelectTab} />

                  {/* 2-Column Grid (Recent Results & Performance Overview) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    <RecentResults
                      results={RECENT_RESULTS}
                      onViewAll={() => onSelectTab?.("results")}
                      onSelectResult={(item) => setSelectedSubjectResult(item)}
                    />
                    <PerformanceOverview
                      metrics={PERFORMANCE_METRICS}
                      onViewDetails={() => setIsPerformanceModalOpen(true)}
                    />
                  </div>

                  {/* Exam Tips Banner */}
                  <ExamTipsBanner tip={EXAM_TIP} />
                </div>

                {/* Right 4 Columns: Achievements Sidebar */}
                <div className="xl:col-span-4 h-full">
                  <AchievementsCard
                    onViewAll={() => onSelectTab?.("certificates", "badges")}
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Dedicated Subject-Specific Result Scorecard Modal */}
      <SubjectResultModal
        isOpen={!!selectedSubjectResult}
        onClose={() => setSelectedSubjectResult(null)}
        result={selectedSubjectResult}
      />

      {/* Overall Performance Modal */}
      <PerformanceModal
        isOpen={isPerformanceModalOpen}
        onClose={() => setIsPerformanceModalOpen(false)}
      />

      {/* Earned Badges Popup Modal */}
      <EarnedBadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
      />
    </div>
  );
}
