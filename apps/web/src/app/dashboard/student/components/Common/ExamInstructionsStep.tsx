"use client";

import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  TimerIcon,
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
        <div className="size-6 rounded-md bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </div>
      ),
      text: "The exam consists of multiple-choice questions.",
    },
    {
      id: 2,
      icon: (
        <div className="size-6 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <ClockIcon className="w-3 h-3" />
        </div>
      ),
      text: "Total duration is 50 minutes for 50 questions (100 marks).",
    },
    {
      id: 3,
      icon: (
        <div className="size-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
      text: "Each question carries 2 marks. There is no negative marking.",
    },
    {
      id: 4,
      icon: (
        <div className="size-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
      ),
      text: "Ensure a stable internet connection throughout the exam.",
    },
    {
      id: 5,
      icon: (
        <div className="size-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        </div>
      ),
      text: "Selecting an answer advances to the next question. You cannot go back.",
    },
    {
      id: 6,
      icon: (
        <div className="size-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z" />
          </svg>
        </div>
      ),
      text: "The exam runs in full screen and cannot be exited until finished.",
    },
    {
      id: 7,
      icon: (
        <div className="size-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <TimerIcon className="w-3 h-3" />
        </div>
      ),
      text: "Once you start, the 50-minute timer begins automatically.",
    },
    {
      id: 8,
      icon: (
        <div className="size-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7z" />
          </svg>
        </div>
      ),
      text: "Make sure you are in a quiet place and ready before starting.",
    },
  ];

  return (
    <div className="w-full max-w-full min-w-0 box-border flex-1 flex flex-col items-center overflow-x-clip">
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm w-full max-w-3xl min-w-0 box-border flex flex-col gap-2.5 sm:gap-3 animate-in fade-in duration-200 overflow-x-clip">
        {/* Top Header & Exam Details */}
        <div className="flex flex-col items-center text-center gap-1 min-w-0 max-w-full">
          <div className="size-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shadow-inner shrink-0">
            <FlaskIcon className="w-5 h-5" />
          </div>

          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Exam Instructions
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[10px] sm:text-[11px] font-bold text-slate-700 max-w-full">
            <span>50 Questions</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="w-3 h-3 text-violet-600 shrink-0" />
              50 min
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <TimerIcon className="w-3 h-3 text-violet-600 shrink-0" />
              100 marks
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="w-3 h-3 text-violet-600 shrink-0" />
              +2 / Q
            </span>
          </div>
        </div>

        <div className="text-center min-w-0 max-w-full">
          <div className="flex items-center justify-center gap-1.5 text-violet-600 font-black text-sm">
            <span>✦</span>
            <span>Instructions</span>
            <span>✦</span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5 break-words [overflow-wrap:anywhere]">
            Please read carefully before starting the exam.
          </p>
        </div>

        <div className="flex flex-col gap-1 min-w-0 max-w-full">
          {instructions.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2 py-1.5 px-2 sm:px-2.5 rounded-lg bg-slate-50/80 border border-slate-200/70 min-w-0 max-w-full box-border"
            >
              {item.icon}
              <span className="text-[11px] sm:text-xs font-semibold text-slate-800 min-w-0 flex-1 break-words [overflow-wrap:anywhere] leading-snug">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStartExam}
          className="w-full max-w-full py-2.5 sm:py-3 px-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-600/25 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer box-border"
        >
          <span>▶</span>
          <span>Start Exam</span>
        </button>
      </div>
    </div>
  );
}
