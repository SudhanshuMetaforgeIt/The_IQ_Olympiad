"use client";

import React, { useState, useEffect } from "react";
import type { UpcomingExam } from "../../types";
import {
  CalendarIcon,
  ClockIcon,
  TimerIcon,
  QuestionsIcon,
  PenIcon,
  EyeIcon,
} from "./icons";

interface UpcomingExamBannerProps {
  exam: UpcomingExam;
  onViewDetails?: () => void;
  onWriteExam?: () => void;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function GoldenConfettiTrophy() {
  return (
    <div className="relative w-28 h-16 flex items-center justify-center mx-auto mb-1">
      {/* Floating Confetti Particles */}
      <span className="absolute top-0 left-2 text-purple-500 text-[10px] animate-bounce">~</span>
      <span className="absolute top-1 left-4 text-yellow-400 text-[10px] font-bold">★</span>
      <span className="absolute top-3 left-0 text-pink-400 text-[8px]">●</span>
      <span className="absolute top-0 right-2 text-purple-400 text-[10px]">~</span>
      <span className="absolute top-2 right-4 text-yellow-500 text-[10px] font-bold">★</span>
      <span className="absolute bottom-2 left-1 text-blue-400 text-[10px]">✦</span>
      <span className="absolute bottom-0 right-2 text-yellow-400 text-[8px]">●</span>

      {/* Gold Trophy SVG */}
      <svg className="w-20 h-16 drop-shadow-sm" viewBox="0 0 120 100" fill="none">
        <ellipse cx="60" cy="85" rx="35" ry="8" fill="#E0E7FF" opacity="0.6" />
        <path d="M30 25 C15 25 15 50 35 52" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M90 25 C105 25 105 50 85 52" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M32 20 L88 20 C88 20 88 55 60 62 C32 55 32 20 32 20 Z" fill="url(#goldGradBannerSm)" stroke="#D97706" strokeWidth="2" />
        <rect x="30" y="16" width="60" height="7" rx="3.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <polygon points="60,30 63,38 71,39 65,45 67,53 60,49 53,53 55,45 49,39 57,38" fill="#FFFFFF" />
        <path d="M54 62 L66 62 L68 76 L52 76 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
        <rect x="42" y="76" width="36" height="8" rx="2" fill="#4F46E5" />
        <rect x="36" y="84" width="48" height="6" rx="2" fill="#3730A3" />
        <defs>
          <linearGradient id="goldGradBannerSm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function UpcomingExamBanner({ exam, onViewDetails, onWriteExam }: UpcomingExamBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "07",
    hours: "00",
    minutes: "09",
    seconds: "37",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(exam.startTimeIso) - +new Date();
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
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [exam.startTimeIso]);

  return (
    <section className="bg-[#F6F5FF] border border-purple-100/80 rounded-3xl p-4 sm:p-5 md:p-6 shadow-xs relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
        
        {/* 1. LEFT SECTION: Science Olympiad Info (5 Columns) */}
        <div className="lg:col-span-5 flex items-start gap-3.5">
          <div className="size-12 sm:size-14 rounded-2xl bg-[#EDE9FE] text-[#6366F1] flex items-center justify-center shrink-0 shadow-inner">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <div>
            <span className="text-xs font-extrabold text-[#6366F1] tracking-wide block uppercase">
              Your Upcoming Exam
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight mt-0.5">
              {exam.title}
            </h2>

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{exam.date}</span>
              </div>
              <span className="text-slate-300 font-normal">|</span>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{exam.time}</span>
              </div>
              <span className="text-slate-300 font-normal">|</span>
              <div className="flex items-center gap-1">
                <TimerIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{exam.durationMinutes} Mins</span>
              </div>
              <span className="text-slate-300 font-normal">|</span>
              <div className="flex items-center gap-1">
                <QuestionsIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>{exam.totalQuestions} Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE SECTION: EXAM STARTS IN Countdown Box (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
            EXAM STARTS IN
          </span>

          <div className="flex items-center gap-1.5 w-full justify-center">
            {/* Days */}
            <div className="bg-white rounded-xl py-2 px-2.5 text-center border border-slate-100/90 shadow-2xs flex-1 max-w-[62px]">
              <span className="block text-xl sm:text-2xl font-black text-[#4F46E5] leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] font-bold text-slate-500 mt-1 block">
                Days
              </span>
            </div>

            <span className="text-[#4F46E5] font-black text-base -mt-3 px-0.5">:</span>

            {/* Hours */}
            <div className="bg-white rounded-xl py-2 px-2.5 text-center border border-slate-100/90 shadow-2xs flex-1 max-w-[62px]">
              <span className="block text-xl sm:text-2xl font-black text-[#4F46E5] leading-none">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] font-bold text-slate-500 mt-1 block">
                Hours
              </span>
            </div>

            <span className="text-[#4F46E5] font-black text-base -mt-3 px-0.5">:</span>

            {/* Minutes */}
            <div className="bg-[#4F46E5] text-white rounded-xl py-2 px-2.5 text-center border border-indigo-600 shadow-sm flex-1 max-w-[62px]">
              <span className="block text-xl sm:text-2xl font-black leading-none">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] font-bold text-indigo-100 mt-1 block">
                Minutes
              </span>
            </div>

            <span className="text-[#4F46E5] font-black text-base -mt-3 px-0.5">:</span>

            {/* Seconds */}
            <div className="bg-white rounded-xl py-2 px-2.5 text-center border border-slate-100/90 shadow-2xs flex-1 max-w-[62px]">
              <span className="block text-xl sm:text-2xl font-black text-[#4F46E5] leading-none">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] font-bold text-slate-500 mt-1 block">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* 3. RIGHT SECTION: Cup / Trophy DIRECTLY CENTERED ABOVE Buttons (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center text-center">
          <GoldenConfettiTrophy />

          {/* Buttons Stack */}
          <div className="flex flex-col gap-2 w-full max-w-[180px]">
            <button
              type="button"
              onClick={onWriteExam}
              className="w-full bg-gradient-to-r from-[#4F46E5] to-[#4338CA] hover:from-[#4338CA] hover:to-[#3730A3] text-white font-extrabold text-xs sm:text-sm py-2.5 px-3.5 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <PenIcon className="w-3.5 h-3.5 text-white" />
              <span>Write Exam</span>
            </button>
            <button
              type="button"
              onClick={onViewDetails}
              className="w-full bg-white hover:bg-indigo-50/60 text-[#4F46E5] font-extrabold text-xs sm:text-sm py-2 px-3.5 rounded-xl border border-[#4F46E5] shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <EyeIcon className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>View Details</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
