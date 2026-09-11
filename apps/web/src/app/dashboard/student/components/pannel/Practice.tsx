"use client";

import React, { useState } from "react";
import { StudentPanelChrome } from "../Common/StudentPanelChrome";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { PRACTICE_SUBJECTS } from "./Practice/practiceData";
import { PracticeCard } from "./Practice/PracticeCard";
import { PracticeProgressBanner } from "./Practice/PracticeProgressBanner";
import { PracticeUnlimitedBanner } from "./Practice/PracticeUnlimitedBanner";
import { PracticeTestInterface } from "./Practice/PracticeTestInterface";
import type { PracticeSubject } from "./Practice/types";
import type { StudentProfile } from "../../types";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

const SUBJECT_FILTER_OPTIONS = [
  { id: "all", label: "All Subjects" },
  { id: "science", label: "Science" },
  { id: "math", label: "Mathematics" },
  { id: "english", label: "English" },
  { id: "gk", label: "General Knowledge" },
];

function PracticePanelBody({
  activeTab,
  onSelectTab,
  student,
}: {
  activeTab: string;
  onSelectTab?: (tabId: string) => void;
  student: StudentProfile;
}) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [activePracticeSubject, setActivePracticeSubject] = useState<PracticeSubject | null>(null);

  const filteredSubjects = PRACTICE_SUBJECTS.filter((subj) => {
    if (selectedSubjectFilter === "all") return true;
    return subj.id === selectedSubjectFilter;
  });

  const currentSubjectLabel =
    SUBJECT_FILTER_OPTIONS.find((opt) => opt.id === selectedSubjectFilter)?.label ?? "All Subjects";

  if (activePracticeSubject) {
    return (
      <PracticeTestInterface
        subject={activePracticeSubject}
        student={student}
        onBack={() => setActivePracticeSubject(null)}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={student} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={student} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Header Title & Dropdown Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Practice
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Sharpen your skills with practice tests and mock tests.
              </p>
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-2.5">
              {/* All Subjects Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200/90 bg-white text-slate-700 font-bold text-xs sm:text-sm shadow-2xs hover:border-violet-300 hover:bg-slate-50 transition cursor-pointer min-w-[150px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span>{currentSubjectLabel}</span>
                  </div>
                  <svg
                    className={`w-3 h-3 text-slate-400 ml-1 transition-transform ${isSubjectDropdownOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isSubjectDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsSubjectDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 divide-y divide-slate-50">
                      {SUBJECT_FILTER_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setSelectedSubjectFilter(option.id);
                            setIsSubjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-medium transition flex items-center justify-between hover:bg-violet-50 hover:text-violet-700 cursor-pointer ${selectedSubjectFilter === option.id
                              ? "text-violet-700 font-bold bg-violet-50/50"
                              : "text-slate-700"
                            }`}
                        >
                          {option.label}
                          {selectedSubjectFilter === option.id && (
                            <span className="text-violet-600 font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Top 10 Free Practice Tests Progress Banner */}
          <PracticeProgressBanner />

          {/* Subject Practice Cards Grid */}
          {filteredSubjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs py-16 px-4 text-center">
              <p className="text-sm font-bold text-slate-700">No practice subjects available</p>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Practice subjects and mock tests will appear here when available.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-3.5 sm:gap-4 w-full ${filteredSubjects.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 lg:grid-cols-2"
                }`}
            >
              {filteredSubjects.map((subject) => (
                <PracticeCard
                  key={subject.id}
                  subject={subject}
                  onStartPracticing={(subj) => setActivePracticeSubject(subj)}
                />
              ))}
            </div>
          )}

          {/* Bottom Unlimited Practice Banner */}
          <PracticeUnlimitedBanner />
        </main>
      </div>
    </div>
  );
}

export default function PracticePanel({ activeTab = "practice", onSelectTab }: PanelProps) {
  return (
    <StudentPanelChrome activeTab={activeTab} onSelectTab={onSelectTab}>
      {({ student, activeTab, onSelectTab }) => (
        <PracticePanelBody
          student={student}
          activeTab={activeTab}
          onSelectTab={onSelectTab}
        />
      )}
    </StudentPanelChrome>
  );
}
