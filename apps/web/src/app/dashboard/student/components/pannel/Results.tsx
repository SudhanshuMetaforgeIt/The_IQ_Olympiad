"use client";

import React, { useState, useMemo } from "react";
import { STUDENT_PROFILE } from "../Common/mockData";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { PerformanceModal } from "../Common/PerformanceModal";
import {
  ResultsTopStats,
  OlympiadsResultsTable,
  PracticeResultsTable,
  StudentAnalyticsCard,
  ResultsBottomBanner,
  OlympiadScorecardModal,
  PracticeResultsModal,
  OLYMPIAD_RESULTS_DATA,
  PRACTICE_RESULTS_DATA,
  type OlympiadResultRecord,
  type PracticeResultRecord,
} from "./Results/index";

interface ResultsPanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function ResultsPanel({
  activeTab = "results",
  onSelectTab,
}: ResultsPanelProps) {
  const [isOverallPerformanceModalOpen, setIsOverallPerformanceModalOpen] = useState(false);
  const [selectedOlympiadResult, setSelectedOlympiadResult] = useState<OlympiadResultRecord | null>(null);
  const [selectedPracticeResult, setSelectedPracticeResult] = useState<PracticeResultRecord | null>(null);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  // Filtered Olympiad Results based on selected subject
  const filteredOlympiadResults = useMemo(() => {
    if (selectedSubject === "All Subjects") {
      return OLYMPIAD_RESULTS_DATA;
    }
    return OLYMPIAD_RESULTS_DATA.filter((item) => {
      if (selectedSubject === "Science") return item.iconType === "science";
      if (selectedSubject === "Mathematics") return item.iconType === "math";
      if (selectedSubject === "English") return item.iconType === "english";
      if (selectedSubject === "Cyber") return item.iconType === "cyber";
      return true;
    });
  }, [selectedSubject]);

  const handleSelectOlympiadResult = (result: OlympiadResultRecord) => {
    setSelectedOlympiadResult(result);
  };

  const handleViewAllOlympiadResults = () => {
    if (filteredOlympiadResults.length === 1) {
      setSelectedOlympiadResult(filteredOlympiadResults[0]);
    } else {
      setIsOverallPerformanceModalOpen(true);
    }
  };

  const handleViewAllPractice = () => {
    setSelectedPracticeResult(null);
    setIsPracticeModalOpen(true);
  };

  const handleSelectPracticeRow = (practice: PracticeResultRecord) => {
    setSelectedPracticeResult(practice);
    setIsPracticeModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        student={STUDENT_PROFILE}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Top 3 Metric Cards */}
          <ResultsTopStats />

          {/* Middle 2-Column Grid: Olympiads Results & Practice Results */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <OlympiadsResultsTable
              results={filteredOlympiadResults}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
              onViewAll={handleViewAllOlympiadResults}
              onSelectResult={handleSelectOlympiadResult}
            />

            <PracticeResultsTable
              results={PRACTICE_RESULTS_DATA}
              onViewAll={handleViewAllPractice}
              onSelectPractice={handleSelectPracticeRow}
            />
          </div>

          {/* Full-width Student Analytics */}
          <StudentAnalyticsCard />

          {/* Bottom Banner Strip */}
          <ResultsBottomBanner />
        </main>
      </div>

      {/* Specific Subject Olympiad Scorecard Modal Popup */}
      <OlympiadScorecardModal
        isOpen={selectedOlympiadResult !== null}
        onClose={() => setSelectedOlympiadResult(null)}
        result={selectedOlympiadResult}
      />

      {/* Practice Results Modal Popup */}
      <PracticeResultsModal
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        results={PRACTICE_RESULTS_DATA}
        selectedPractice={selectedPracticeResult}
      />

      {/* Overall Performance Modal Popup */}
      <PerformanceModal
        isOpen={isOverallPerformanceModalOpen}
        onClose={() => setIsOverallPerformanceModalOpen(false)}
      />
    </div>
  );
}
