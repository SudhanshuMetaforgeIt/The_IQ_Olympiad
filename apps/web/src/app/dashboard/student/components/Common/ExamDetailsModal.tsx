"use client";

import React, { useState, useEffect } from "react";
import type { UpcomingExam } from "../../types";
import {
  CalendarIcon,
  ClockIcon,
  TimerIcon,
  QuestionsIcon,
  TrophyLogoIcon,
  ShieldStarIcon,
  StarIcon,
} from "./icons";

interface ExamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam?: UpcomingExam;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function ExamDetailsModal({
  isOpen,
  onClose,
  exam,
}: ExamDetailsModalProps) {
  const emptyTimeLeft: TimeLeft = {
    days: "—",
    hours: "—",
    minutes: "—",
    seconds: "—",
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(emptyTimeLeft);
  const startTimeIso = exam?.startTimeIso;
  const displayTimeLeft = startTimeIso ? timeLeft : emptyTimeLeft;

  useEffect(() => {
    if (!startTimeIso) {
      return;
    }
    const calculateTimeLeft = () => {
      const difference = +new Date(startTimeIso) - +new Date();
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startTimeIso]);

  if (!isOpen) return null;

  const examTitle = exam?.title || "—";
  const examDate = exam?.date || "—";
  const examTime = exam?.time || "—";
  const examDuration = exam?.durationMinutes;
  const examQuestions = exam?.totalQuestions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200 relative">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 1. Top Purple Hero Card */}
        <div className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#7C3AED] rounded-3xl p-5 sm:p-6 text-white relative overflow-hidden shadow-md">
          {/* Faint Trophy Watermark in Background */}
          <div className="absolute -right-6 -bottom-8 text-white/10 pointer-events-none">
            <TrophyLogoIcon className="w-48 h-48 fill-current" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full inline-block">
                CONFIRMED REGISTRATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {examTitle}
              </h2>
              <p className="text-xs sm:text-[13px] text-violet-100 font-medium leading-relaxed">
                Be ready 15 minutes before the scheduled start time for AI facial check.
              </p>
            </div>

            {/* Starts In Countdown Box */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center shrink-0 self-start md:self-auto">
              <span className="text-[10px] font-black text-violet-200 uppercase tracking-wider block mb-1.5">
                STARTS IN
              </span>
              <div className="flex items-center gap-1.5 justify-center">
                <div className="bg-white text-slate-900 rounded-xl px-2 py-1.5 min-w-[40px] sm:min-w-[46px] text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black leading-none">{displayTimeLeft.days}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">DAYS</span>
                </div>
                <span className="text-white font-black text-sm -mt-2">:</span>
                <div className="bg-white text-slate-900 rounded-xl px-2 py-1.5 min-w-[40px] sm:min-w-[46px] text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black leading-none">{displayTimeLeft.hours}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">HRS</span>
                </div>
                <span className="text-white font-black text-sm -mt-2">:</span>
                <div className="bg-white text-slate-900 rounded-xl px-2 py-1.5 min-w-[40px] sm:min-w-[46px] text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black leading-none">{displayTimeLeft.minutes}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">MIN</span>
                </div>
                <span className="text-white font-black text-sm -mt-2">:</span>
                <div className="bg-white text-slate-900 rounded-xl px-2 py-1.5 min-w-[40px] sm:min-w-[46px] text-center shadow-xs">
                  <span className="block text-base sm:text-lg font-black leading-none">{displayTimeLeft.seconds}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5 block">SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. EXAM SPECIFICATIONS Title */}
        <div>
          <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase mb-3">
            EXAM SPECIFICATIONS
          </h3>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: DATE */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-violet-600 mb-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">DATE</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">{examDate}</span>
              <span className="text-xs font-medium text-slate-500 block">—</span>
            </div>

            {/* Card 2: TIME SLOT */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-violet-600 mb-1">
                <ClockIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">TIME SLOT</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">{examTime}</span>
              <span className="text-xs font-medium text-slate-500 block">IST</span>
            </div>

            {/* Card 3: DURATION */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-violet-600 mb-1">
                <TimerIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">DURATION</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">{examDuration != null ? `${examDuration} Minutes` : "—"}</span>
              <span className="text-xs font-medium text-slate-500 block">Timed Online Test</span>
            </div>

            {/* Card 4: TOTAL QUESTIONS */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-violet-600 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">TOTAL QUESTIONS</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">{examQuestions != null ? `${examQuestions} Questions` : "—"}</span>
              <span className="text-xs font-medium text-slate-500 block">Objective (MCQ)</span>
            </div>

            {/* Card 5: TOTAL MARKS */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <StarIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">TOTAL MARKS</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">—</span>
              <span className="text-xs font-bold text-emerald-600 block">No Negative Marking</span>
            </div>

            {/* Card 6: FORMAT & MODE */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-violet-600 mb-1">
                <ShieldStarIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">FORMAT & MODE</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 block">AI Proctored</span>
              <span className="text-xs font-medium text-slate-500 block">Browser Fullscreen</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Candidate Admit Card */}
        <div className="bg-[#F8F7FF] border border-violet-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-wider block">
              CANDIDATE ADMIT CARD
            </span>
            <h4 className="text-sm sm:text-base font-black text-slate-900">
              — • Class —
            </h4>
            <p className="text-xs font-medium text-slate-500">
              Olympiad ID: <span className="font-bold text-[#6366F1]">—</span> • —
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0] text-xs font-extrabold flex items-center gap-1.5">
              <span>✓</span> Verified & Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
