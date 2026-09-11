"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface ExamLiveInterfaceStepProps {
  onExitExam: () => void;
}

const OLYMPIAD_QUESTIONS: ExamQuestion[] = [];

export function ExamLiveInterfaceStep({ onExitExam }: ExamLiveInterfaceStepProps) {
  const TOTAL_QUESTIONS = OLYMPIAD_QUESTIONS.length;
  const SECONDS_PER_QUESTION = 60;
  const OVERALL_TOTAL_SECONDS = Math.max(TOTAL_QUESTIONS * SECONDS_PER_QUESTION, 0);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [overallTimeLeft, setOverallTimeLeft] = useState(OVERALL_TOTAL_SECONDS);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  const currentQ = OLYMPIAD_QUESTIONS[currentQIndex];
  const hasQuestions = TOTAL_QUESTIONS > 0 && !!currentQ;

  // Enter browser fullscreen mode when exam starts
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch {
        // Fullscreen may be blocked by browser policy — silently ignore
      }
    };
    enterFullscreen();

    return () => {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      } catch {
        // ignore
      }
    };
  }, []);

  useEffect(() => {
    if (isExamCompleted) {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      } catch {
        // ignore
      }
    }
  }, [isExamCompleted]);

  const advanceToNextQuestion = useCallback(() => {
    if (!hasQuestions) {
      setIsExamCompleted(true);
      return;
    }
    if (currentQIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setQuestionTimeLeft(SECONDS_PER_QUESTION);
    } else {
      setIsExamCompleted(true);
    }
  }, [currentQIndex, TOTAL_QUESTIONS, hasQuestions]);

  useEffect(() => {
    if (isExamCompleted || !hasQuestions) return;

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          advanceToNextQuestion();
          return SECONDS_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [advanceToNextQuestion, isExamCompleted, hasQuestions]);

  useEffect(() => {
    if (isExamCompleted || !hasQuestions) return;

    const timer = setInterval(() => {
      setOverallTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExamCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamCompleted, hasQuestions]);

  const handleOptionSelect = (option: string) => {
    if (!currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleClearSelection = () => {
    if (!currentQ) return;
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  const formatOverallTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    OLYMPIAD_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score += 2;
        correctCount += 1;
      }
    });
    return { score, correctCount, attempted: Object.keys(selectedAnswers).length };
  };

  if (!hasQuestions && !isExamCompleted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center space-y-6 shadow-xl">
          <div className="size-20 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center mx-auto text-3xl font-black">
            ?
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">No test data available</h2>
            <p className="text-sm font-medium text-slate-500">
              This exam session has no questions loaded yet.
            </p>
          </div>
          <button
            type="button"
            onClick={onExitExam}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isExamCompleted) {
    const { score, correctCount, attempted } = calculateScore();
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Exam Submitted Successfully!</h2>
            <p className="text-sm font-medium text-slate-500">
              Your test session is completed.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="p-3">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Score</span>
              <span className="text-2xl font-black text-violet-600 mt-1 block">{score} / {TOTAL_QUESTIONS * 2 || "—"}</span>
            </div>
            <div className="p-3 border-x border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Attempted</span>
              <span className="text-2xl font-black text-indigo-600 mt-1 block">{attempted} / {TOTAL_QUESTIONS || "—"}</span>
            </div>
            <div className="p-3">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Correct</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">{correctCount}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onExitExam}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentOption = selectedAnswers[currentQ.id];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased select-none">
      <header className="bg-white border-b border-slate-200/90 px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <button type="button" onClick={onExitExam} className="flex items-center gap-3.5 cursor-pointer hover:opacity-80 transition">
          <div className="size-11 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-black text-base shadow-md shadow-violet-600/25">
            IQO
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">
              Exam Session
            </h1>
            <p className="text-xs font-bold text-slate-500">
              {TOTAL_QUESTIONS} Questions • {Math.floor(OVERALL_TOTAL_SECONDS / 60)} Minutes
            </p>
          </div>
        </button>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-violet-50/90 border border-violet-100 shadow-xs">
            <div className="relative size-9 flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-violet-200"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={questionTimeLeft <= 10 ? "text-rose-500 animate-pulse" : "text-violet-600"}
                  strokeDasharray={`${(questionTimeLeft / SECONDS_PER_QUESTION) * 100}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className={`absolute text-xs font-black ${questionTimeLeft <= 10 ? "text-rose-600" : "text-violet-950"}`}>
                {questionTimeLeft}s
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Question Time
              </span>
              <span className="text-xs font-extrabold text-violet-700">
                1 Minute Auto-Advance
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Exam Time
            </span>
            <span className="text-sm font-black text-slate-900 font-mono">
              {formatOverallTime(overallTimeLeft)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>● PROCTORED</span>
          </div>
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs">
            <span className="font-extrabold text-slate-800">Student</span>
          </div>
        </div>
      </header>

      <div className="w-full bg-slate-200 h-1.5">
        <div
          className="bg-gradient-to-r from-violet-600 to-indigo-600 h-1.5 transition-all duration-300"
          style={{ width: `${((currentQIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>

      <main className="flex-1 w-full p-6 sm:p-10 flex flex-col justify-between space-y-6">
        <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Question {currentQIndex + 1} of {TOTAL_QUESTIONS}
              </span>
              <span className="text-xs font-extrabold text-violet-700 bg-violet-50 px-3 py-1 rounded-xl border border-violet-100">
                2 Marks
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
              No Backwards Navigation
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </div>

          <div className="space-y-4 pt-2">
            {["A", "B", "C", "D"].map((optLabel, idx) => {
              const optionText = currentQ.options[idx];
              const isSelected = currentOption === optLabel;

              return (
                <button
                  key={optLabel}
                  type="button"
                  onClick={() => handleOptionSelect(optLabel)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border text-left flex items-center gap-5 transition cursor-pointer ${
                    isSelected
                      ? "bg-violet-50/90 border-violet-600 text-violet-950 font-bold shadow-sm ring-2 ring-violet-500/20"
                      : "bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-white hover:border-violet-300 font-medium"
                  }`}
                >
                  <div
                    className={`size-9 rounded-2xl border-2 flex items-center justify-center text-sm font-black transition shrink-0 ${
                      isSelected
                        ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {optLabel}
                  </div>
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full pt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleClearSelection}
            disabled={!currentOption}
            className={`px-6 py-4 rounded-2xl border text-sm font-bold transition ${
              !currentOption
                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs"
            }`}
          >
            Clear Selection
          </button>

          <button
            type="button"
            onClick={advanceToNextQuestion}
            className="py-4 px-8 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center gap-2.5 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
          >
            <span>{currentQIndex === TOTAL_QUESTIONS - 1 ? "Submit Exam" : "Submit Answer & Next"}</span>
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
