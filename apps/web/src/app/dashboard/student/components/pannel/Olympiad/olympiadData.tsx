import React from "react";
import type { OlympiadExam } from "./types";

export const OLYMPIAD_EXAMS: OlympiadExam[] = [
  {
    id: 1,
    title: "Science Olympiad 2026",
    description: "Challenge your knowledge in Physics, Chemistry, Biology and more.",
    date: "25 Aug 2026",
    time: "10:00 AM",
    duration: "50 Minutes",
    questions: 50,
    marks: 100,
    status: "upcoming",
    countdownText: "2 Days",
    countdownSubtext: "Starts in",
    countdownColor: "text-emerald-500",
    statusBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    statusColor: "emerald",
    iconBg: "bg-[#E6F9F2]",
    icon: (
      <svg className="w-10 h-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.65 17.8A2 2 0 0 0 6.38 21h11.24a2 2 0 0 0 1.73-3.2L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Mathematics Olympiad 2026",
    description: "Solve real-world problems and boost your logical thinking skills.",
    date: "10 Sep 2026",
    time: "10:00 AM",
    duration: "60 Minutes",
    questions: 50,
    marks: 100,
    status: "upcoming",
    countdownText: "18 Days",
    countdownSubtext: "Starts in",
    countdownColor: "text-violet-600",
    statusBg: "bg-violet-50 text-violet-600 border-violet-100",
    statusColor: "violet",
    iconBg: "bg-[#F3E8FF]",
    icon: (
      <svg className="w-10 h-10 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
  },
  {
    id: 3,
    title: "English Olympiad 2026",
    description: "Enhance your grammar, vocabulary and comprehension skills.",
    date: "28 Sep 2026",
    time: "10:00 AM",
    duration: "60 Minutes",
    questions: 50,
    marks: 100,
    status: "upcoming",
    countdownText: "36 Days",
    countdownSubtext: "Starts in",
    countdownColor: "text-amber-500",
    statusBg: "bg-amber-50 text-amber-600 border-amber-100",
    statusColor: "amber",
    iconBg: "bg-[#FEF3C7]",
    icon: (
      <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Cyber Olympiad 2026",
    description: "Explore the world of cyber and information security.",
    date: "15 Oct 2026",
    time: "10:00 AM",
    duration: "60 Minutes",
    questions: 50,
    marks: 100,
    status: "ongoing",
    countdownText: "01:25:30",
    countdownSubtext: "Ends in",
    countdownColor: "text-sky-600",
    statusBg: "bg-sky-50 text-sky-600 border-sky-100",
    statusColor: "sky",
    iconBg: "bg-[#E0F2FE]",
    icon: (
      <svg className="w-10 h-10 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <rect x="9" y="8" width="6" height="4" rx="1" />
        <path d="M10 8V6.5a2 2 0 0 1 4 0V8" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "General Knowledge Olympiad 2026",
    description: "Test your awareness and knowledge across various topics.",
    date: "20 Jul 2026",
    time: "10:00 AM",
    duration: "60 Minutes",
    questions: 50,
    marks: 100,
    scorePercentage: 92,
    status: "completed",
    countdownText: "92%",
    countdownSubtext: "Score Percentage",
    countdownColor: "text-emerald-600",
    statusBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusColor: "emerald",
    iconBg: "bg-[#FCE7F3]",
    icon: (
      <svg className="w-10 h-10 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
];
