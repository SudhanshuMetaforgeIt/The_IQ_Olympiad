import React from "react";
import type { PracticeSubject } from "./types";

export const PRACTICE_SUBJECTS: PracticeSubject[] = [
  {
    id: "science",
    title: "Science",
    description: "Explore the world of Physics, Chemistry and Biology with concept-based practice.",
    topicsCount: 24,
    questionsCount: 560,
    testsInfo: "6 / 10 (Free)",
    avgScore: 72,
    freeTestsUsed: 6,
    totalFreeTests: 10,
    buttonClass: "bg-[#059669] hover:bg-[#047857]",
    iconBgClass: "bg-[#E6F9F2]",
    iconColorClass: "text-[#059669]",
    icon: (
      <svg className="w-10 h-10 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.65 17.8A2 2 0 0 0 6.38 21h11.24a2 2 0 0 0 1.73-3.2L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
    watermarkGraphic: (
      <svg className="w-20 h-20 text-emerald-200/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="40" ry="16" />
        <ellipse cx="50" cy="50" rx="40" ry="16" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="16" transform="rotate(120 50 50)" />
      </svg>
    ),
  },
  {
    id: "math",
    title: "Mathematics",
    description: "Strengthen your problem solving skills with varied question sets.",
    topicsCount: 28,
    questionsCount: 650,
    testsInfo: "8 / 10 (Free)",
    avgScore: 68,
    freeTestsUsed: 8,
    totalFreeTests: 10,
    buttonClass: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    iconBgClass: "bg-[#F3E8FF]",
    iconColorClass: "text-[#7C3AED]",
    icon: (
      <svg className="w-10 h-10 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="3" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
      </svg>
    ),
    watermarkGraphic: (
      <svg className="w-20 h-20 text-purple-200/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="20,20 35,10 50,20 40,35 25,35" />
        <rect x="60" y="20" width="18" height="18" transform="rotate(45 69 29)" />
        <circle cx="75" cy="70" r="14" />
        <path d="M75 56v14h14" />
        <line x1="15" y1="65" x2="30" y2="80" />
        <line x1="30" y1="65" x2="15" y2="80" />
      </svg>
    ),
  },
  {
    id: "english",
    title: "English",
    description: "Improve your grammar, vocabulary and comprehension skills.",
    topicsCount: 20,
    questionsCount: 480,
    testsInfo: "4 / 10 (Free)",
    avgScore: 75,
    freeTestsUsed: 4,
    totalFreeTests: 10,
    buttonClass: "bg-[#EA580C] hover:bg-[#C2410C]",
    iconBgClass: "bg-[#FEF3C7]",
    iconColorClass: "text-[#D97706]",
    icon: (
      <svg className="w-10 h-10 text-[#D97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    ),
    watermarkGraphic: (
      <div className="flex flex-col items-center justify-center font-black text-amber-200/50 select-none text-2xl tracking-widest leading-none">
        <span className="text-xl">A</span>
        <div className="flex gap-2">
          <span>B</span>
          <span className="text-lg">C</span>
        </div>
      </div>
    ),
  },
  {
    id: "gk",
    title: "General Knowledge",
    description: "Boost your analytical and critical thinking abilities.",
    topicsCount: 18,
    questionsCount: 420,
    testsInfo: "7 / 10 (Free)",
    avgScore: 70,
    freeTestsUsed: 7,
    totalFreeTests: 10,
    buttonClass: "bg-[#2563EB] hover:bg-[#1D4ED8]",
    iconBgClass: "bg-[#DBEAFE]",
    iconColorClass: "text-[#2563EB]",
    icon: (
      <svg className="w-10 h-10 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    watermarkGraphic: (
      <svg className="w-20 h-20 text-blue-200/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M30 30 h15 a5 5 0 0 1 5 -5 a5 5 0 0 1 5 5 h15 v15 a5 5 0 0 1 5 5 a5 5 0 0 1 -5 5 v15 h-15 a5 5 0 0 0 -5 5 a5 5 0 0 0 -5 -5 h-15 v-15 a5 5 0 0 0 -5 -5 a5 5 0 0 0 5 -5 z" />
      </svg>
    ),
  },
];
