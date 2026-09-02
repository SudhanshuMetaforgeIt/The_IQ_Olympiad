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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // Default Q2 to match mockup
  const [answers, setAnswers] = useState<Record<number, string>>({ 1: "A", 2: "A" });
  const [markedForReview, setMarkedForReview] = useState<number[]>([7, 13]);
  const [secondsRemaining, setSecondsRemaining] = useState(59 * 60 + 45); // 59:45
  const [showEndTestModal, setShowEndTestModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalQuestions = 50;
  const currentQ = SAMPLE_PRACTICE_QUESTIONS[currentQuestionIndex] || SAMPLE_PRACTICE_QUESTIONS[0];
  const answeredCount = Object.keys(answers).length;
  const notAnsweredCount = totalQuestions - answeredCount;

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Top Header Bar */}
      <PracticeTestHeader
        subject={subject}
        onBack={onBack}
        onEndTest={() => setShowEndTestModal(true)}
      />

      {/* 2. Top 4-Stats Metrics Card */}
      <PracticeTestMetricsBar
        secondsRemaining={secondsRemaining}
        totalQuestions={totalQuestions}
        totalMarks={100}
      />

      {/* 3. Main Grid: Left Question Navigator & Right Question Area */}
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

      {/* 4. Bottom Navigation Controls */}
      <PracticeTestBottomBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleMarkForReview={toggleMarkForReview}
      />

      {/* 5. End Test Confirmation Modal */}
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
