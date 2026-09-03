"use client";

import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  TimerIcon,
  QuestionsIcon,
  FlaskIcon,
} from "./icons";

interface ExamInstructionsStepProps {
  onStartExam: () => void;
}

export function ExamInstructionsStep({ onStartExam }: ExamInstructionsStepProps) {
  const instructions = [
    {
      id: 1,
      icon: (
        <div className="size-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </div>
      ),
      text: "The exam consists of 50 multiple-choice questions.",
    },
    {
      id: 2,
      icon: (
        <div className="size-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <ClockIcon className="w-3.5 h-3.5" />
        </div>
      ),
      text: "The total duration of the exam is 50 minutes.",
    },
    {
      id: 3,
      icon: (
        <div className="size-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
      text: "Each question carries 1 mark. There is no negative marking.",
    },
    {
      id: 4,
      icon: (
        <div className="size-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
      ),
      text: "Ensure a stable internet connection throughout the exam.",
    },
    {
      id: 5,
      icon: (
        <div className="size-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        </div>
      ),
      text: "Do not refresh or close the browser tab during the exam.",
    },
    {
      id: 6,
      icon: (
        <div className="size-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z" />
          </svg>
        </div>
      ),
      text: "The exam will start in full screen mode and cannot be exited.",
    },
    {
      id: 7,
      icon: (
        <div className="size-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <TimerIcon className="w-3.5 h-3.5" />
        </div>
      ),
      text: "Once you start the exam, the timer will begin automatically.",
    },
    {
      id: 8,
      icon: (
        <div className="size-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7z" />
          </svg>
        </div>
      ),
      text: "Make sure you are in a quiet place and ready before starting the exam.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm w-full flex-1 flex flex-col gap-4 animate-in fade-in duration-200">
      {/* Top Header & Exam Details */}
      <div className="flex flex-col items-center text-center space-y-1.5">
        {/* Soft Purple Flask Circle Badge */}
        <div className="size-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shadow-inner">
          <FlaskIcon className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Science Olympiad 2026
        </h2>

        {/* Info Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-violet-600" />
            <span>08 Sep 2026</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-violet-600" />
            <span>10:00 AM</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <TimerIcon className="w-3.5 h-3.5 text-violet-600" />
            <span>50 Minutes</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <QuestionsIcon className="w-3.5 h-3.5 text-violet-600" />
            <span>50 Questions</span>
          </div>
        </div>
      </div>

      {/* Instructions Title Banner */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-violet-600 font-black text-lg">
          <span>✦</span>
          <span>Instructions</span>
          <span>✦</span>
        </div>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          Please read the following instructions carefully before starting the exam.
        </p>
      </div>

      {/* Instruction List Cards - Spread evenly to fill space */}
      <div className="flex-1 flex flex-col justify-between gap-1">
        {instructions.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-violet-200 transition-all"
          >
            {item.icon}
            <span className="text-sm font-semibold text-slate-800">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onStartExam}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
      >
        <span>▶</span>
        <span>Start Exam</span>
      </button>
    </div>
  );
}
