"use client";

import React, { useState, useMemo } from "react";
import type { PracticeSubject } from "./types";
import {
  SUBJECT_PRACTICE_TESTS_MAP,
  type PracticeTestItem,
} from "./subjectPracticeTestsData";
import { PracticeSubscriptionModal } from "./PracticeSubscriptionModal";

interface SubjectPracticeTestsViewProps {
  subject: PracticeSubject;
  allSubjects: PracticeSubject[];
  onSelectSubject: (subject: PracticeSubject) => void;
  onBackToSubjects: () => void;
  onStartTest: (testId: number, testTitle: string) => void;
}

export function SubjectPracticeTestsView({
  subject,
  allSubjects,
  onSelectSubject,
  onBackToSubjects,
  onStartTest,
}: SubjectPracticeTestsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // Get tests for the current subject
  const tests: PracticeTestItem[] = useMemo(() => {
    return SUBJECT_PRACTICE_TESTS_MAP[subject.id] || [];
  }, [subject.id]);

  // Extract all unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    tests.forEach((t) => set.add(t.topic));
    return Array.from(set);
  }, [tests]);

  // Filter tests based on search, topic, and difficulty
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (
        searchQuery.trim() &&
        !test.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !test.topic.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (selectedTopic !== "all" && test.topic !== selectedTopic) {
        return false;
      }
      if (selectedDifficulty !== "all" && test.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [tests, searchQuery, selectedTopic, selectedDifficulty]);

  // Progress metrics
  const completedCount = tests.filter((t) => t.isCompleted).length;
  const totalCount = tests.length;
  const remainingCount = totalCount - completedCount;
  const percentCompleted = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // SVG Circular Ring calculation (radius 36)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentCompleted / 100) * circumference;

  return (
    <div className="space-y-4 sm:space-y-5 pb-8">
      {/* 1. Breadcrumb & Title Row */}
      <div className="space-y-2">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={onBackToSubjects}
            className="hover:text-violet-600 transition cursor-pointer"
          >
            Practice
          </button>
          <span className="text-slate-400">›</span>
          <span className="text-slate-900 font-bold">{subject.title}</span>
        </nav>

        {/* Title and Subject Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {subject.title} Practice Tests
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Sharpen your skills with practice tests and track your progress.
            </p>
          </div>

          {/* Subject Switcher Button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200/90 bg-white text-slate-800 font-bold text-xs sm:text-sm shadow-2xs hover:border-violet-300 hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="size-5 rounded-md flex items-center justify-center text-violet-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 2v7.31L4.65 17.8A2 2 0 0 0 6.38 21h11.24a2 2 0 0 0 1.73-3.2L14 9.31V2" />
                  <path d="M8.5 2h7" />
                </svg>
              </div>
              <span>{subject.title}</span>
              <svg
                className={`w-3.5 h-3.5 text-slate-400 ml-1 transition-transform ${
                  isSubjectDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isSubjectDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSubjectDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 divide-y divide-slate-50">
                  {allSubjects.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        onSelectSubject(s);
                        setIsSubjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition flex items-center justify-between hover:bg-violet-50 hover:text-violet-700 cursor-pointer ${
                        s.id === subject.id
                          ? "text-violet-700 font-bold bg-violet-50/60"
                          : "text-slate-700"
                      }`}
                    >
                      <span>{s.title}</span>
                      {s.id === subject.id && (
                        <span className="text-violet-600 font-black">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Top "10 Free Practice Tests" Banner */}
      <div className="bg-[#FAF8FF] border border-violet-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between relative overflow-hidden shadow-2xs">
        <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
          <div className="size-11 sm:size-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 border border-violet-200/60 shadow-2xs">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              10 Free Practice Tests
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              You can attempt Tests 1–10 for free. Test 11 onwards requires a subscription.
            </p>
          </div>
        </div>

        {/* Atom Watermark Graphic */}
        <div className="absolute right-4 -top-3 pointer-events-none opacity-40 sm:opacity-50">
          <svg className="w-24 h-24 text-violet-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="7" fill="currentColor" opacity="0.4" />
            <ellipse cx="50" cy="50" rx="38" ry="14" />
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(120 50 50)" />
          </svg>
        </div>
      </div>

      {/* 3. Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Circular gauge + Completion text */}
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 flex items-center justify-center">
            <svg className="size-16 -rotate-90" viewBox="0 0 88 88">
              {/* Background Track */}
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="6.5"
                fill="transparent"
              />
              {/* Progress Stroke (Teal / Emerald) */}
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="stroke-emerald-500 transition-all duration-700 ease-out"
                strokeWidth="6.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-slate-900 tracking-tight">
                {percentCompleted}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              <span className="text-slate-900">{completedCount}</span> of{" "}
              <span className="text-slate-900">{totalCount}</span> free tests completed
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Keep going! You&apos;re doing great.
            </p>
          </div>
        </div>

        {/* Right: 10 Segmented Capsule Pills & Stats */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from({ length: totalCount }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-4 sm:w-5 rounded-full transition-all ${
                  idx < completedCount
                    ? "bg-violet-600 shadow-2xs"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-violet-700 font-black">{completedCount} Completed</span>
            <span className="text-slate-400 font-normal">•</span>
            <span className="text-slate-500">{remainingCount} Remaining</span>
          </div>
        </div>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tests..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm placeholder:text-slate-400 font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 shadow-2xs transition"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2.5">
          {/* Topics Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTopicDropdownOpen(!isTopicDropdownOpen);
                setIsDifficultyDropdownOpen(false);
              }}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 font-bold text-xs shadow-2xs hover:border-violet-300 transition cursor-pointer min-w-[130px]"
            >
              <span>{selectedTopic === "all" ? "All Topics" : selectedTopic}</span>
              <svg
                className={`w-3 h-3 text-slate-400 transition-transform ${
                  isTopicDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isTopicDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsTopicDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 max-h-60 overflow-y-auto divide-y divide-slate-50">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTopic("all");
                      setIsTopicDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-violet-50 hover:text-violet-700 transition cursor-pointer ${
                      selectedTopic === "all" ? "text-violet-700 font-bold bg-violet-50/60" : "text-slate-700"
                    }`}
                  >
                    All Topics
                  </button>
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(t);
                        setIsTopicDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-violet-50 hover:text-violet-700 transition cursor-pointer ${
                        selectedTopic === t ? "text-violet-700 font-bold bg-violet-50/60" : "text-slate-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsDifficultyDropdownOpen(!isDifficultyDropdownOpen);
                setIsTopicDropdownOpen(false);
              }}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 font-bold text-xs shadow-2xs hover:border-violet-300 transition cursor-pointer min-w-[130px]"
            >
              <span>
                {selectedDifficulty === "all"
                  ? "All Difficulty"
                  : selectedDifficulty}
              </span>
              <svg
                className={`w-3 h-3 text-slate-400 transition-transform ${
                  isDifficultyDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isDifficultyDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDifficultyDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 divide-y divide-slate-50">
                  {["all", "Easy", "Medium", "Hard"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        setIsDifficultyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-violet-50 hover:text-violet-700 transition cursor-pointer ${
                        selectedDifficulty === diff
                          ? "text-violet-700 font-bold bg-violet-50/60"
                          : "text-slate-700"
                      }`}
                    >
                      {diff === "all" ? "All Difficulty" : diff}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5. Tests Table / List View */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
          <div className="col-span-5">Test</div>
          <div className="col-span-2">Questions</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-1">Difficulty</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Rows List */}
        <div className="divide-y divide-slate-100/80">
          {filteredTests.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-bold">
              {tests.length === 0
                ? "No mock tests available"
                : "No practice tests match your search criteria."}
            </div>
          ) : (
            filteredTests.map((test) => (
              <div
                key={test.id}
                className="p-4 sm:px-6 sm:py-4 flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-3 md:gap-0 hover:bg-slate-50/60 transition"
              >
                {/* 1. Test Number, Title & Topic Badge */}
                <div className="col-span-5 flex items-center gap-3.5 min-w-0 w-full">
                  <div className="size-9 sm:size-10 rounded-xl bg-violet-50 text-violet-700 font-black text-sm sm:text-base flex items-center justify-center shrink-0 border border-violet-100/80 shadow-2xs">
                    {test.testNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
                      {test.title}
                    </h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-[10px] font-extrabold border border-violet-100/60">
                      {test.topic}
                    </span>
                  </div>
                </div>

                {/* 2. Questions */}
                <div className="col-span-2 flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block leading-none">
                      {test.questionsCount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                      Questions
                    </span>
                  </div>
                </div>

                {/* 3. Duration */}
                <div className="col-span-2 flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block leading-none">
                      {test.durationMinutes}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                      Minutes
                    </span>
                  </div>
                </div>

                {/* 4. Difficulty */}
                <div className="col-span-1 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="4" className={test.difficulty === "Hard" ? "text-rose-500" : "text-slate-300"} strokeWidth="3" />
                    <line x1="12" y1="20" x2="12" y2="10" className={test.difficulty !== "Easy" ? "text-amber-500" : "text-slate-300"} strokeWidth="3" />
                    <line x1="6" y1="20" x2="6" y2="16" className="text-emerald-500" strokeWidth="3" />
                  </svg>
                  <span
                    className={`text-xs font-extrabold ${
                      test.difficulty === "Easy"
                        ? "text-emerald-600"
                        : test.difficulty === "Medium"
                        ? "text-amber-600"
                        : "text-rose-600"
                    }`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                {/* 5. Action (Completed vs Start Test) */}
                <div className="col-span-2 flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-0 border-slate-100">
                  {test.isCompleted ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-black">
                          ✓ Completed
                        </span>
                        <div className="text-[11px] font-bold text-slate-400 mt-1">
                          Score:{" "}
                          <span className="font-black text-violet-700">
                            {test.score}
                          </span>{" "}
                          / {test.maxScore || 100}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onStartTest(test.id, test.title)}
                        className="size-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
                        title="Review or retake test"
                      >
                        <span className="text-sm font-black">›</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStartTest(test.id, test.title)}
                      className="w-full md:w-auto px-4 py-2 rounded-xl border border-violet-600 text-violet-700 hover:bg-violet-600 hover:text-white font-extrabold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Start Test</span>
                      <span className="text-xs leading-none">›</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 6. Bottom Locked Banner (Test 11 onwards) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="size-11 sm:size-12 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-600/25">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
              Test 11 onwards
            </h4>
            <span className="text-xs font-bold text-violet-600 block mt-0.5">
              Subscription Required
            </span>
            <p className="text-xs text-slate-500 font-medium mt-1 max-w-xl">
              Unlock unlimited practice tests and continue your preparation with advanced tests and detailed analytics.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSubscriptionModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99] shrink-0"
        >
          <span>👑</span>
          <span>View Subscription Plans</span>
        </button>
      </div>

      {/* 7. Footer Tip Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 rounded-xl bg-violet-50/50 border border-violet-100 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span className="text-sm">💡</span>
          <span>
            <strong className="text-slate-800 font-black">Tip:</strong> Regular practice helps you improve accuracy and speed.
          </span>
        </div>
        <div className="text-slate-500 font-medium">
          Need help?{" "}
          <button
            type="button"
            onClick={() => alert("Connecting you with IQ Olympiad Student Support.")}
            className="text-violet-700 font-bold hover:underline cursor-pointer"
          >
            Visit Help Center
          </button>
        </div>
      </div>

      {/* Subscription Plans Modal */}
      <PracticeSubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
}
