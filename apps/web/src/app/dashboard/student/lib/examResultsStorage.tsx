import React from "react";
import type { OlympiadExam } from "../components/pannel/Olympiad/types";
import type { OlympiadResultRecord } from "../components/pannel/Results/types";

export interface QuestionReviewItem {
  questionId: string;
  questionNumber: number;
  section: string;
  question: string;
  options: { id: string; text: string }[];
  userAnswer?: string; // e.g. "A" | "B" | "C" | "D" | undefined
  correctAnswer: string; // e.g. "D"
  isCorrect: boolean;
  isAttempted: boolean;
  marks: number;
  earnedMarks: number;
  explanation?: string;
}

export interface SectionScoreSummary {
  section: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  totalMarks: number;
  accuracy: number;
}

export interface StoredExamResult {
  id: string;
  examId: string;
  title: string;
  subjectSlug: string;
  iconType: "science" | "math" | "english" | "cyber" | "reasoning" | "iq";
  date: string;
  time: string;
  submittedAt: string;
  score: number;
  totalScore: number;
  percentage: number;
  passingMarks: number;
  totalQuestions: number;
  attempted: number;
  unattempted: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  nationalRank: number;
  medal: "gold" | "silver" | "bronze" | "none";
  resultStatus: "Qualified" | "Participation" | "Not Qualified";
  sectionBreakdown: SectionScoreSummary[];
  questions: QuestionReviewItem[];
}

export const STORAGE_KEY_EXAM_RESULTS = "iqo_completed_exam_results";

export function saveCompletedExamResult(result: StoredExamResult): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getCompletedExamResults();
    // Filter out previous submission for the same exam if any, or prepend new attempt
    const updated = [result, ...existing.filter((r) => r.id !== result.id)];
    window.localStorage.setItem(STORAGE_KEY_EXAM_RESULTS, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save completed exam result to localStorage", err);
  }
}

export function getCompletedExamResults(): StoredExamResult[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_EXAM_RESULTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read completed exam results from localStorage", err);
    return [];
  }
}

export function getCompletedExamResultById(id: string): StoredExamResult | null {
  const results = getCompletedExamResults();
  return results.find((r) => r.id === id || r.examId === id) ?? null;
}

export function mapStoredResultToOlympiadExam(stored: StoredExamResult): OlympiadExam {
  // Numeric id hash from id/examId string for React key
  let numId = 1000;
  for (let i = 0; i < stored.id.length; i++) {
    numId = (numId * 31 + stored.id.charCodeAt(i)) % 100000;
  }

  return {
    id: numId,
    title: stored.title,
    description: `Official Olympiad Examination • Scored ${stored.score}/${stored.totalScore} (${stored.percentage.toFixed(1)}%)`,
    date: stored.date,
    time: stored.time,
    duration: "50 Mins",
    questions: stored.totalQuestions,
    marks: stored.totalScore,
    scorePercentage: Math.round(stored.percentage),
    status: "completed",
    countdownText: `${stored.percentage.toFixed(0)}%`,
    countdownSubtext: "Final Score",
    countdownColor: "text-emerald-600",
    statusBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusColor: "text-emerald-700",
    iconBg: "bg-violet-100 text-violet-700",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
}

export function mapStoredResultToOlympiadResultRecord(stored: StoredExamResult): OlympiadResultRecord {
  return {
    id: stored.id,
    name: stored.title,
    subjectSlug: stored.subjectSlug,
    date: stored.date,
    score: stored.score,
    totalScore: stored.totalScore,
    percentage: stored.percentage,
    nationalRank: stored.nationalRank,
    totalStudents: 15000,
    medal: stored.medal,
    resultStatus: stored.resultStatus,
    iconType: stored.iconType,
    questions: stored.questions,
    sectionBreakdown: stored.sectionBreakdown,
  };
}
