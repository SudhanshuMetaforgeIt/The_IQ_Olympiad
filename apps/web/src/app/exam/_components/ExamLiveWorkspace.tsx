"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getExamPartLabel, type ExamDetails } from "../_data/examQuestions";

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
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);

  const TOTAL_QUESTIONS = exam.questions.length; // 50
  const SECONDS_PER_QUESTION = 60; // 1 minute per question
  const OVERALL_TOTAL_SECONDS = TOTAL_QUESTIONS * SECONDS_PER_QUESTION; // 50 * 60 = 3000s

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [overallSecondsRemaining, setOverallSecondsRemaining] = useState(OVERALL_TOTAL_SECONDS);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tabSwitchWarning, setTabSwitchWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  // Attach camera stream to picture-in-picture proctoring preview
  useEffect(() => {
    if (miniVideoRef.current && cameraStream) {
      miniVideoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

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
      if (!document.fullscreenElement && !isSubmitted) {
        setFullscreenWarning(true);
      } else {
        setFullscreenWarning(false);
      }
    };

    // Tab switch detection
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted) {
        setTabSwitchCount((c) => c + 1);
        setTabSwitchWarning(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [ensureFullscreen, isSubmitted]);

  const questionStartTimeRef = useRef(Date.now());
  const isTransitioningRef = useRef(false);
  const examStartTimeRef = useRef(Date.now());

  // Strictly advance one question after another every 60 seconds (1 minute per question)
  useEffect(() => {
    if (isSubmitted) return;

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
  }, [currentQIndex, isSubmitted, TOTAL_QUESTIONS, SECONDS_PER_QUESTION]);

  // Overall Exam Countdown Timer (Drift-free, timestamp synchronized)
  useEffect(() => {
    if (isSubmitted) return;

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
  }, [isSubmitted, OVERALL_TOTAL_SECONDS]);

  const currentQ = exam.questions[currentQIndex];

  // Selecting an option: stays on the question so student can change or clear response during the 1 minute
  const handleSelectOption = (opt: string) => {
    if (!currentQ || isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));
  };

  // Clear Response for current question
  const handleClearResponse = () => {
    if (!currentQ || isSubmitted) return;
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
              IMO Olympiad • 100 Marks Total
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Exam Completed & Submitted!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isPassed
                ? "Congratulations! You have successfully completed the IMO Olympiad."
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

          {/* Return button ONLY available now after completion */}
          <button
            type="button"
            onClick={handleExitToDashboard}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-violet-600/25 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased select-none">
      {/* Top Header Bar: Clean White Theme with IMO Olympiad Title, Total Time, Mini Proctor Cam, and NO Exit Button */}
      <header className="bg-white border-b border-slate-200/90 px-6 sm:px-10 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-violet-600/25">
            IMO
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              IMO Olympiad
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Question {currentQIndex + 1} of {TOTAL_QUESTIONS} • 100 Marks Total
            </p>
          </div>
        </div>

        {/* Right: Total Time & Mini Live Proctoring (Question Time moved above the question, NO Exit button) */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Overall Remaining Total Exam Time */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
            <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-slate-500 font-medium">Total Time:</span>
            <span className="font-mono font-black text-slate-900 text-sm">{formatTimer(overallSecondsRemaining)}</span>
          </div>

          {/* Mini Camera Proctoring Preview */}
          <div className="relative w-24 sm:w-28 h-14 sm:h-16 rounded-xl bg-slate-900 border-2 border-violet-500/80 overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
            {cameraStream ? (
              <video
                ref={miniVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs">👤</span>
                <span className="text-[8px] font-black text-violet-300">PROCTOR</span>
              </div>
            )}
            <div className="absolute top-1 left-1.5 flex items-center gap-1 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-black text-white uppercase tracking-wider">LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Warning Modal if student exited fullscreen */}
      {fullscreenWarning && (
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

      {/* Tab Switch Warning Banner */}
      {tabSwitchWarning && (
        <div className="bg-rose-50 text-rose-800 px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-rose-200 animate-in fade-in">
          <span>⚠️ Warning: Tab switching detected ({tabSwitchCount} times). You cannot leave this window until the exam is completed.</span>
          <button
            type="button"
            onClick={() => setTabSwitchWarning(false)}
            className="text-rose-900 underline ml-3 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Single Workspace: Fixed top-aligned, clean, NO centering shift, NO side panel */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col">
        {/* Dedicated 1-Minute Question Timer Banner - Placed Directly Above The Question */}
        <div className="mb-4 bg-white border border-slate-200/90 rounded-2xl p-4 sm:px-6 sm:py-3.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`size-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${
              questionTimeLeft <= 10
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-violet-50 text-violet-700 border-violet-200"
            }`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Question {currentQIndex + 1} Timer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  1 Minute Limit
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-end">
            {/* Visual Countdown Progress Bar */}
            <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  questionTimeLeft <= 10
                    ? "bg-rose-500"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600"
                }`}
                style={{ width: `${(questionTimeLeft / SECONDS_PER_QUESTION) * 100}%` }}
              />
            </div>

            {/* Countdown Display Badge */}
            <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 shrink-0 transition-all ${
              questionTimeLeft <= 10
                ? "bg-rose-50 border-rose-300 text-rose-600 animate-pulse font-black"
                : "bg-violet-50 border-violet-200 text-violet-800 font-black"
            }`}>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Time Left:</span>
              <span className="text-base font-mono font-black">
                {formatTimer(questionTimeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm">
          {currentQ ? (
            <div className="space-y-6">
              {/* Question Metadata Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200/80 text-xs font-black">
                    Question {currentQIndex + 1} of {TOTAL_QUESTIONS}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {currentQ.subject || getExamPartLabel(currentQIndex + 1)}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed pt-1">
                {currentQ.question}
              </div>

              {/* Options List: Click to select, student stays on question until 1 minute ends */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = currentAnswer === opt;

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
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
                        {opt}
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

          {/* Bottom Bar: Clear Response button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-start text-xs">
            {/* Clear Response Button */}
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
          </div>
        </div>
      </main>
    </div>
  );
}
