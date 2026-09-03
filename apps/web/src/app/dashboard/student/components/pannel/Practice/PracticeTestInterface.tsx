"use client";

import React, { useState, useEffect } from "react";
import type { PracticeSubject } from "./types";
import { SAMPLE_PRACTICE_QUESTIONS } from "./practiceQuestionsData";
import { PracticeTestHeader } from "./PracticeTestHeader";
import { PracticeTestMetricsBar } from "./PracticeTestMetricsBar";
import { PracticeQuestionNavigator } from "./PracticeQuestionNavigator";
import { PracticeQuestionCard } from "./PracticeQuestionCard";
import { PracticeTestBottomBar } from "./PracticeTestBottomBar";
import { PracticeEndTestModal } from "./PracticeEndTestModal";

interface PracticeTestInterfaceProps {
  subject: PracticeSubject;
  onBack: () => void;
}

export function PracticeTestInterface({ subject, onBack }: PracticeTestInterfaceProps) {
  const totalQuestions = SAMPLE_PRACTICE_QUESTIONS.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [showEndTestModal, setShowEndTestModal] = useState(false);

  // Timer countdown — only when duration is set
  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const currentQ = SAMPLE_PRACTICE_QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const notAnsweredCount = Math.max(totalQuestions - answeredCount, 0);

  const handleSelectOption = (key: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex + 1]: key,
    }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestionIndex + 1];
      return next;
    });
  };

  const toggleMarkForReview = () => {
    const qNum = currentQuestionIndex + 1;
    setMarkedForReview((prev) =>
      prev.includes(qNum) ? prev.filter((id) => id !== qNum) : [...prev, qNum]
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleConfirmEndTest = () => {
    setShowEndTestModal(false);
    onBack();
  };

  if (totalQuestions === 0 || !currentQ) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 flex flex-col p-4 sm:p-6 lg:p-8">
        <PracticeTestHeader
          subject={subject}
          onBack={onBack}
          onEndTest={onBack}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center space-y-3">
            <p className="text-base font-black text-slate-900">No test data available</p>
            <p className="text-xs font-medium text-slate-500">
              This practice test has no questions loaded yet.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 transition cursor-pointer"
            >
              Back to Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      <PracticeTestHeader
        subject={subject}
        onBack={onBack}
        onEndTest={() => setShowEndTestModal(true)}
      />

      <PracticeTestMetricsBar
        secondsRemaining={secondsRemaining}
        totalQuestions={totalQuestions}
        totalMarks={totalQuestions * 2}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-4">
          <PracticeQuestionNavigator
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            markedForReview={markedForReview}
            onSelectQuestion={setCurrentQuestionIndex}
            onClearResponse={handleClearResponse}
          />
        </div>

        <div className="xl:col-span-8">
          <PracticeQuestionCard
            currentQ={currentQ}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            selectedAnswer={answers[currentQuestionIndex + 1]}
            isMarkedForReview={markedForReview.includes(currentQuestionIndex + 1)}
            onSelectOption={handleSelectOption}
            onToggleMarkForReview={toggleMarkForReview}
          />
        </div>
      </div>

      <PracticeTestBottomBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleMarkForReview={toggleMarkForReview}
      />

      <PracticeEndTestModal
        isOpen={showEndTestModal}
        answeredCount={answeredCount}
        notAnsweredCount={notAnsweredCount}
        markedCount={markedForReview.length}
        onResume={() => setShowEndTestModal(false)}
        onConfirmEnd={handleConfirmEndTest}
      />
    </div>
  );
}
