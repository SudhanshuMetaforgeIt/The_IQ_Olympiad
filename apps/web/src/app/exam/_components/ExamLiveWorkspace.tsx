"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getExamPartLabel, type ExamDetails } from "../_data/examQuestions";
import { InExamProctorWidget } from "../cam-monitoring";
import type { TerminationEvent, ProctoringViolationEvent } from "../cam-monitoring/types";
import {
  saveCompletedExamResult,
  type StoredExamResult,
  type QuestionReviewItem,
  type SectionScoreSummary,
  mapStoredResultToOlympiadResultRecord,
} from "@/app/dashboard/student/lib/examResultsStorage";
import { OlympiadScorecardModal } from "@/app/dashboard/student/components/pannel/Results/OlympiadScorecardModal";

interface ExamLiveWorkspaceProps {
  exam: ExamDetails;
  cameraStream: MediaStream | null;
  onFinishExam: () => void;
}

export function ExamLiveWorkspace({
  exam,
  cameraStream,
  onFinishExam,
}: ExamLiveWorkspaceProps) {
  const TOTAL_QUESTIONS = exam.questions.length; // 50
  const SECONDS_PER_QUESTION = 60; // 1 minute per question
  const OVERALL_TOTAL_SECONDS = TOTAL_QUESTIONS * SECONDS_PER_QUESTION; // 50 * 60 = 3000s

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [overallSecondsRemaining, setOverallSecondsRemaining] = useState(OVERALL_TOTAL_SECONDS);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [savedResult, setSavedResult] = useState<StoredExamResult | null>(null);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  // Strict Proctoring Termination state
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationEvent, setTerminationEvent] = useState<TerminationEvent | null>(null);

  // Maintain strict full-screen mode during exam
  const ensureFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setFullscreenWarning(false);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    ensureFullscreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isSubmitted && !isTerminated) {
        setFullscreenWarning(true);
      } else {
        setFullscreenWarning(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [ensureFullscreen, isSubmitted, isTerminated]);

  // Handle termination from AI proctor
  const handleExamTerminated = useCallback((event: TerminationEvent) => {
    console.warn("[Live Exam] Exam terminated due to proctoring violation limit:", event);
    setIsTerminated(true);
    setTerminationEvent(event);
  }, []);

  const questionStartTimeRef = useRef(Date.now());
  const isTransitioningRef = useRef(false);
  const examStartTimeRef = useRef(Date.now());

  // Strictly advance one question after another every 60 seconds (1 minute per question)
  useEffect(() => {
    if (isSubmitted || isTerminated) return;

    // Reset timestamp and transition guard for the current question
    questionStartTimeRef.current = Date.now();
    isTransitioningRef.current = false;
    setQuestionTimeLeft(SECONDS_PER_QUESTION);

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      const remainingSeconds = Math.max(0, SECONDS_PER_QUESTION - elapsedSeconds);
      setQuestionTimeLeft(remainingSeconds);

      if (remainingSeconds <= 0 && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        clearInterval(interval);

        // Advance strictly to the very next question (Q1 -> Q2 -> Q3) or submit if last question
        setCurrentQIndex((prevIndex) => {
          if (prevIndex < TOTAL_QUESTIONS - 1) {
            return prevIndex + 1;
          } else {
            setIsSubmitted(true);
            return prevIndex;
          }
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, [currentQIndex, isSubmitted, isTerminated, TOTAL_QUESTIONS, SECONDS_PER_QUESTION]);

  // Overall Exam Countdown Timer (Drift-free, timestamp synchronized)
  useEffect(() => {
    if (isSubmitted || isTerminated) return;

    const overallTimer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - examStartTimeRef.current) / 1000);
      const remainingSeconds = Math.max(0, OVERALL_TOTAL_SECONDS - elapsedSeconds);
      setOverallSecondsRemaining(remainingSeconds);

      if (remainingSeconds <= 0) {
        setIsSubmitted(true);
        clearInterval(overallTimer);
      }
    }, 1000);

    return () => clearInterval(overallTimer);
  }, [isSubmitted, isTerminated, OVERALL_TOTAL_SECONDS]);

  const currentQ = exam.questions[currentQIndex];

  // Selecting an option: stays on the question so student can change or clear response during the 1 minute
  const handleSelectOption = (opt: string) => {
    if (!currentQ || isSubmitted || isTerminated) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));
  };

  // Clear Response for current question
  const handleClearResponse = () => {
    if (!currentQ || isSubmitted || isTerminated) return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Score calculation: 100 marks total (2 marks per question)
  const calculateResults = useCallback(() => {
    let score = 0;
    let correctCount = 0;
    exam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score += q.marks; // +2 marks
        correctCount += 1;
      }
    });
    const attempted = Object.keys(selectedAnswers).length;
    const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
    return {
      score,
      totalPossibleMarks: exam.totalMarks, // 100
      correctCount,
      attempted,
      accuracy,
      unattempted: TOTAL_QUESTIONS - attempted,
    };
  }, [exam, selectedAnswers, TOTAL_QUESTIONS]);

  // Clean up camera stream and exit fullscreen only when exam is submitted and student returns to dashboard
  const handleExitToDashboard = () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } catch {
      // ignore
    }
    onFinishExam();
  };

  const hasSavedRef = useRef(false);

  useEffect(() => {
    if (!isSubmitted || hasSavedRef.current) return;
    hasSavedRef.current = true;

    const stats = calculateResults();
    const percentage = Number(((stats.score / (exam.totalMarks || 100)) * 100).toFixed(2));
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Build question review items
    const questionReviewItems: QuestionReviewItem[] = exam.questions.map((q, idx) => {
      const userAnswer = selectedAnswers[q.id];
      const isAttempted = Boolean(userAnswer);
      const isCorrect = isAttempted && userAnswer === q.answer;
      return {
        questionId: q.id,
        questionNumber: idx + 1,
        section: q.subject,
        question: q.question,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        userAnswer,
        correctAnswer: q.answer || "A",
        isCorrect,
        isAttempted,
        marks: q.marks,
        earnedMarks: isCorrect ? q.marks : 0,
        explanation: q.explanation,
      };
    });

    // Build section breakdown
    const sectionMap: Record<string, { totalQ: number; attempted: number; correct: number; score: number; totalMarks: number }> = {};
    questionReviewItems.forEach((q) => {
      if (!sectionMap[q.section]) {
        sectionMap[q.section] = { totalQ: 0, attempted: 0, correct: 0, score: 0, totalMarks: 0 };
      }
      const s = sectionMap[q.section];
      s.totalQ += 1;
      s.totalMarks += q.marks;
      if (q.isAttempted) s.attempted += 1;
      if (q.isCorrect) {
        s.correct += 1;
        s.score += q.marks;
      }
    });

    const sectionBreakdown: SectionScoreSummary[] = Object.entries(sectionMap).map(([section, s]) => ({
      section,
      totalQuestions: s.totalQ,
      attempted: s.attempted,
      correct: s.correct,
      wrong: s.attempted - s.correct,
      score: s.score,
      totalMarks: s.totalMarks,
      accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
    }));

    let medal: "gold" | "silver" | "bronze" | "none" = "none";
    if (percentage >= 90) medal = "gold";
    else if (percentage >= 75) medal = "silver";
    else if (percentage >= 60) medal = "bronze";

    const nationalRank = Math.max(1, Math.floor((100 - percentage) * 25) + 18);

    const storedResult: StoredExamResult = {
      id: `result_${exam.id || "demo"}`,
      examId: exam.id || "68d123abc",
      title: exam.title || "The IQ Olympiad",
      subjectSlug: "math",
      iconType: "math",
      date: dateStr,
      time: timeStr,
      submittedAt: now.toISOString(),
      score: stats.score,
      totalScore: exam.totalMarks || 100,
      percentage,
      passingMarks: exam.passingMarks || 50,
      totalQuestions: TOTAL_QUESTIONS,
      attempted: stats.attempted,
      unattempted: stats.unattempted,
      correctCount: stats.correctCount,
      wrongCount: stats.attempted - stats.correctCount,
      accuracy: stats.accuracy,
      nationalRank,
      medal,
      resultStatus: stats.score >= (exam.passingMarks || 50) ? "Qualified" : "Participation",
      sectionBreakdown,
      questions: questionReviewItems,
    };

    setSavedResult(storedResult);
    saveCompletedExamResult(storedResult);
  }, [isSubmitted, calculateResults, exam, selectedAnswers, TOTAL_QUESTIONS]);

  // RESULT SCORECARD: Clean White Theme (rendered after completing 50 questions)
  if (isSubmitted) {
    const stats = calculateResults();
    const isPassed = stats.score >= exam.passingMarks;

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 max-w-xl w-full text-center space-y-6 shadow-xl animate-in zoom-in-95">
          <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto text-3xl font-black shadow-sm">
            ✓
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
              {exam.title || "IMO Olympiad"} • {exam.totalMarks || 100} Marks Total
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Exam Completed & Submitted!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isPassed
                ? "Congratulations! You have successfully completed the examination."
                : "Your examination submission has been verified and recorded."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Score</span>
              <span className="text-2xl font-black text-violet-600 mt-1 block">
                {stats.score} / {stats.totalPossibleMarks}
              </span>
            </div>
            <div className="p-3 border-x border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Attempted</span>
              <span className="text-2xl font-black text-indigo-600 mt-1 block">
                {stats.attempted} / {TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="p-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {stats.accuracy}%
              </span>
            </div>
          </div>

          {/* Action Buttons: Review Answers & Return to Dashboard */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="flex-1 py-3.5 px-5 rounded-2xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-sm shadow-sm hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Review Answers</span>
            </button>

            <button
              type="button"
              onClick={handleExitToDashboard}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-violet-600/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Return to Dashboard</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Modal popup to review all questions and solutions */}
          {savedResult && (
            <OlympiadScorecardModal
              isOpen={isReviewModalOpen}
              onClose={() => setIsReviewModalOpen(false)}
              result={mapStoredResultToOlympiadResultRecord(savedResult)}
              initialTab="review"
            />
          )}
        </div>
      </div>
    );
  }

  const currentAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased select-none">
      {/* Sticky Top Header with Integrated Question Timer (Stays Visible When Scrolling) */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs">
        {/* Upper Header Row: Olympiad Title, Total Time, Submit Exam & Proctoring */}
        <div className="px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-md shadow-violet-600/25">
              IQO
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {exam.title || "The IQ Olympiad"}
              </h1>
              <p className="text-[11px] font-semibold text-slate-500">
                Official Examination • {exam.totalMarks || 100} Marks Total
              </p>
            </div>
          </div>

          {/* Right: Total Time & Mini Live Proctoring */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Overall Remaining Total Exam Time */}
            <div className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
              <svg className="w-3.5 h-3.5 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-slate-500 font-medium hidden sm:inline text-[11px]">Total Time:</span>
              <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">{formatTimer(overallSecondsRemaining)}</span>
            </div>

            {/* In-Exam AI Proctoring Widget */}
            <InExamProctorWidget
              stream={cameraStream}
              onExamTerminated={handleExamTerminated}
              onReturnToDashboard={handleExitToDashboard}
              className="shadow-sm"
            />
          </div>
        </div>

        {/* Lower Header Row: Question Info & Question Timer (Always Visible on Scroll) */}
        <div className="px-4 sm:px-8 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 bg-slate-50/70">
          {/* Left: Question metadata */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="px-3 py-1 rounded-xl bg-violet-600 text-white font-black text-xs shadow-xs">
              Question {currentQIndex + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200/90 shadow-2xs">
              {currentQ?.subject || getExamPartLabel(currentQIndex + 1)}
            </span>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              • +{currentQ?.marks || 2} Marks
            </span>
          </div>

          {/* Right: Question Timer (Always Sticky in Header) */}
          <div className={`flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 rounded-xl bg-white border shadow-2xs transition-all ${
            questionTimeLeft <= 10
              ? "border-rose-300 bg-rose-50/70 shadow-rose-500/10 ring-2 ring-rose-500/20"
              : "border-slate-200/90"
          }`}>
            <div className={`size-7 sm:size-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border transition-all ${
              questionTimeLeft <= 10
                ? "bg-rose-100 text-rose-600 border-rose-200"
                : "bg-violet-50 text-violet-700 border-violet-200"
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                  Question Timer
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-500 font-bold">
                  1m Limit
                </span>
              </div>

              {/* Mini Progress Bar */}
              <div className="w-24 sm:w-32 h-1 rounded-full bg-slate-100 overflow-hidden mt-0.5">
                <div
                  className={`h-full transition-all duration-1000 ${
                    questionTimeLeft <= 10
                      ? "bg-rose-500"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600"
                  }`}
                  style={{ width: `${(questionTimeLeft / SECONDS_PER_QUESTION) * 100}%` }}
                />
              </div>
            </div>

            {/* Countdown Badge */}
            <div className={`px-2.5 py-0.5 rounded-lg border flex items-center gap-1 shrink-0 transition-all ${
              questionTimeLeft <= 10
                ? "bg-rose-50 border-rose-300 text-rose-600 animate-pulse font-black"
                : "bg-violet-50 border-violet-200 text-violet-800 font-black"
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide hidden md:inline">
                Time Left:
              </span>
              <span className="text-xs sm:text-sm font-mono font-black">
                {formatTimer(questionTimeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Countdown Progress Bar running full-width along the bottom of the sticky header */}
        <div className="w-full h-1 bg-slate-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              questionTimeLeft <= 10
                ? "bg-rose-500"
                : "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600"
            }`}
            style={{ width: `${(questionTimeLeft / SECONDS_PER_QUESTION) * 100}%` }}
          />
        </div>
      </header>

      {/* Fullscreen Warning Modal if student exited fullscreen and exam is not terminated */}
      {fullscreenWarning && !isTerminated && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border-2 border-rose-500 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="size-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mx-auto">
              ⚠️
            </div>
            <h3 className="text-xl font-black text-slate-900">Full Screen Required</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This exam must be completed in full screen mode. You cannot exit until all questions are completed.
            </p>
            <button
              type="button"
              onClick={ensureFullscreen}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl hover:scale-[1.01] transition cursor-pointer"
            >
              Resume Full Screen Exam
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace: Full width without side panels */}
      <main className={`flex-1 w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col ${isTerminated ? "pointer-events-none opacity-40 select-none" : ""}`}>

        {/* Question Card: Full-width, starting from the left side */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8 shadow-sm">
          {currentQ ? (
            <div className="space-y-6">
              {/* Question Text */}
              <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </div>

              {/* Options List */}
              <div className="space-y-3.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const optionId = typeof opt === "string" ? opt : opt.id;
                  const optionText = typeof opt === "string" ? opt : opt.text;
                  const letter = optionId || String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = currentAnswer === optionId;

                  return (
                    <button
                      key={optionId}
                      type="button"
                      onClick={() => handleSelectOption(optionId)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer transform active:scale-[0.99] ${
                        isSelected
                          ? "bg-violet-50/90 border-violet-600 text-violet-950 shadow-sm ring-2 ring-violet-500/20 font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30"
                      }`}
                    >
                      <div className={`size-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-600/30"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        {letter}
                      </div>
                      <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">
                        {optionText}
                      </span>
                      {isSelected && (
                        <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Loading question...
            </div>
          )}

          {/* Bottom Bar: Clear Response button & Action buttons */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <button
              type="button"
              disabled={!currentAnswer}
              onClick={handleClearResponse}
              className={`px-4 py-2.5 rounded-xl border font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentAnswer
                  ? "border-rose-200 bg-rose-50/80 text-rose-600 hover:bg-rose-100 shadow-2xs"
                  : "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Response</span>
            </button>

            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Responses are auto-saved • Auto-advances every 1 min</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
