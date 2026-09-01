"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";
import { PRACTICE_SUBJECTS } from "./Practice/practiceData";
import { PracticeCard } from "./Practice/PracticeCard";
import { PracticeProgressBanner } from "./Practice/PracticeProgressBanner";
import { PracticeUnlimitedBanner } from "./Practice/PracticeUnlimitedBanner";
import { PracticeTestInterface } from "./Practice/PracticeTestInterface";
import type { PracticeSubject } from "./Practice/types";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function PracticePanel({ activeTab = "practice", onSelectTab }: PanelProps) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState("Class 8");
  const [activePracticeSubject, setActivePracticeSubject] = useState<PracticeSubject | null>(null);

  const filteredSubjects = PRACTICE_SUBJECTS.filter((subj) => {
    if (selectedSubjectFilter === "all") return true;
    return subj.id === selectedSubjectFilter;
  });

  // If student is currently taking a practice test, show the interactive Practice Test Interface
  if (activePracticeSubject) {
    return (
      <PracticeTestInterface
        subject={activePracticeSubject}
        onBack={() => setActivePracticeSubject(null)}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <HeaderBar student={STUDENT_PROFILE} />

        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between gap-3 overflow-y-auto">
          {/* Header Title & Dropdown Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Practice
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Sharpen your skills with practice tests and mock tests.
              </p>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2.5">
              {/* All Subjects Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 bg-white text-slate-700 font-bold text-xs sm:text-sm shadow-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <span>All Subjects</span>
                  <svg className="w-3 h-3 text-slate-400 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              {/* Class Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 bg-white text-slate-700 font-bold text-xs sm:text-sm shadow-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <span>Class 8</span>
                  <svg className="w-3 h-3 text-slate-400 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Top 10 Free Practice Tests Progress Banner */}
          <PracticeProgressBanner />

          {/* 2x2 Grid of Subject Practice Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 flex-1 min-h-0">
            {filteredSubjects.map((subject) => (
              <PracticeCard
                key={subject.id}
                subject={subject}
                onStartPracticing={(subj) => setActivePracticeSubject(subj)}
              />
            ))}
          </div>

          {/* Bottom Unlimited Practice Banner */}
          <PracticeUnlimitedBanner />
        </main>
      </div>
    </div>
  );
}
