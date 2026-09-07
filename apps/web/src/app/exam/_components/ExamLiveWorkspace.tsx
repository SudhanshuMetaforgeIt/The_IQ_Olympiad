"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ApiError, submitDemoExamAnswers, type DemoExamResult } from "@/lib/api";
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [result, setResult] = useState<DemoExamResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [tabSwitchWarning, setTabSwitchWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  const selectedAnswersRef = useRef(selectedAnswers);
  selectedAnswersRef.current = selectedAnswers;
  const hasRequestedSubmitRef = useRef(false);

  useEffect(() => {
    if (miniVideoRef.current && cameraStream) {
      miniVideoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

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

  useEffect(() => {
    if (isSubmitted) return;

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

        setCurrentQIndex((prevIndex) => {
          if (prevIndex < TOTAL_QUESTIONS - 1) {
            return prevIndex + 1;
          }
          setIsSubmitted(true);
          return prevIndex;
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, [currentQIndex, isSubmitted, TOTAL_QUESTIONS, SECONDS_PER_QUESTION]);

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

  const submitAnswersToBackend = useCallback(async () => {
    setIsSubmittingResult(true);
    setSubmitError(null);

    const answers = Object.entries(selectedAnswersRef.current).map(
      ([questionId, optionId]) => ({
        questionId,
        selectedOptionIds: [optionId],
      }),
    );

    try {
      const payload = await submitDemoExamAnswers(answers);
      setResult(payload);
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to submit exam answers. Please try again.");
      }
      hasRequestedSubmitRef.current = false;
    } finally {
      setIsSubmittingResult(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted || hasRequestedSubmitRef.current) {
      return;
    }
    hasRequestedSubmitRef.current = true;
    void submitAnswersToBackend();
  }, [isSubmitted, submitAnswersToBackend]);

  const currentQ = exam.questions[currentQIndex];

  const handleSelectOption = (optionId: string) => {
    if (!currentQ || isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

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

  if (isSubmitted) {
    if (isSubmittingResult && !result) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-4 shadow-xl">
            <div className="mx-auto size-10 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
            <h2 className="text-xl font-black text-slate-900">Submitting your answers</h2>
            <p className="text-sm text-slate-500">
              Calculating your score securely on the server…
            </p>
          </div>
        </div>
      );
    }

    if (submitError && !result) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-5 shadow-xl">
            <h2 className="text-xl font-black text-slate-900">Unable to submit exam</h2>
            <p className="text-sm text-slate-500">{submitError}</p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  hasRequestedSubmitRef.current = true;
                  void submitAnswersToBackend();
                }}
                disabled={isSubmittingResult}
                className="w-full py-3.5 rounded-2xl bg-violet-600 text-white font-extrabold cursor-pointer disabled:opacity-60"
              >
                {isSubmittingResult ? "Retrying…" : "Retry submission"}
              </button>
              <button
                type="button"
                onClick={handleExitToDashboard}
                className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (result) {
      const domainSections = result.sectionScores.filter((section) => section.maxScore > 0);

      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans antialiased">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 max-w-xl w-full text-center space-y-6 shadow-xl animate-in zoom-in-95">
            <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto text-3xl font-black shadow-sm">
              ✓
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                The IQ Olympiad • {result.totalMarks} Marks Total
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Exam Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Your score was calculated securely on the server. Correct answers are not shown in the browser.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-violet-50 border border-violet-100">
              <span className="text-[10px] font-bold text-violet-600 uppercase block">Score</span>
              <span className="text-4xl font-black text-violet-700 mt-1 block">
                {result.totalScore}
                <span className="text-lg text-violet-400 font-bold"> / {result.totalMarks}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="p-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Correct</span>
                <span className="text-xl font-black text-emerald-600 mt-1 block">
                  {result.correctAnswers}
                </span>
              </div>
              <div className="p-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Incorrect</span>
                <span className="text-xl font-black text-rose-600 mt-1 block">
                  {result.incorrectAnswers}
                </span>
              </div>
              <div className="p-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Attempted</span>
                <span className="text-xl font-black text-indigo-600 mt-1 block">
                  {result.attempted}
                </span>
              </div>
              <div className="p-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Unattempted</span>
                <span className="text-xl font-black text-slate-700 mt-1 block">
                  {result.unattempted}
                </span>
              </div>
            </div>

            {domainSections.length > 0 && (
              <div className="text-left space-y-2">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
                  Section scores
                </h3>
                <div className="space-y-2">
                  {domainSections.map((section) => (
                    <div
                      key={section.cognitiveDomain}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {section.cognitiveDomain}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {section.correct} correct · {section.attempted} attempted
                        </p>
                      </div>
                      <p className="text-sm font-black text-violet-700 tabular-nums">
                        {section.score}/{section.maxScore}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
  }

  const currentAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased select-none">
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

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Overall Time
            </span>
            <span
              className={`text-lg font-black tabular-nums ${
                overallSecondsRemaining <= 60 ? "text-rose-600" : "text-slate-900"
              }`}
            >
              {formatTimer(overallSecondsRemaining)}
            </span>
          </div>

          <div className="relative size-11 rounded-xl overflow-hidden border-2 border-violet-200 bg-slate-100 shadow-sm">
            <video
              ref={miniVideoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 size-full object-cover scale-x-[-1]"
            />
          </div>
        </div>
      </header>

      {(tabSwitchWarning || fullscreenWarning) && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-center text-xs font-bold text-amber-800">
          {fullscreenWarning
            ? "Please return to full screen mode to continue the exam."
            : `Tab switch detected (${tabSwitchCount}). Stay on this page during the exam.`}
          {tabSwitchWarning && (
            <button
              type="button"
              className="ml-3 underline cursor-pointer"
              onClick={() => setTabSwitchWarning(false)}
            >
              Dismiss
            </button>
          )}
          {fullscreenWarning && (
            <button
              type="button"
              className="ml-3 underline cursor-pointer"
              onClick={() => void ensureFullscreen()}
            >
              Re-enter fullscreen
            </button>
          )}
        </div>
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Question {currentQIndex + 1} Timer
            </span>
          </div>
          <span
            className={`text-2xl font-black tabular-nums ${
              questionTimeLeft <= 10 ? "text-rose-600" : "text-slate-900"
            }`}
          >
            {formatTimer(questionTimeLeft)}
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm">
          {currentQ ? (
            <div className="space-y-6">
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

              <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed pt-1 whitespace-pre-wrap">
                {currentQ.question}
              </div>

              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = currentAnswer === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer transform active:scale-[0.99] ${
                        isSelected
                          ? "bg-violet-50/90 border-violet-600 text-violet-950 shadow-sm ring-2 ring-violet-500/20 font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30"
                      }`}
                    >
                      <div
                        className={`size-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-600/30"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {opt.id}
                      </div>
                      <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">
                        {opt.text}
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
            <div className="text-center py-12 text-slate-400">Loading question...</div>
          )}

          <div className="pt-6 border-t border-slate-100 flex items-center justify-start text-xs">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Clear Response</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
