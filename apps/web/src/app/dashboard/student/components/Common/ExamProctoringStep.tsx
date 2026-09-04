"use client";

import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  TimerIcon,
  QuestionsIcon,
  FlaskIcon,
} from "./icons";

interface ExamProctoringStepProps {
  onProceedToLiveExam: () => void;
}

export function ExamProctoringStep({ onProceedToLiveExam }: ExamProctoringStepProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm w-full space-y-8 animate-in fade-in duration-200">
      {/* Top Exam Header */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100">
        <div className="size-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shadow-inner">
          <FlaskIcon className="w-8 h-8" />
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Exam Proctoring Setup
        </h2>

        {/* Info Chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-violet-600" />
            <span>—</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-violet-600" />
            <span>—</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <TimerIcon className="w-4 h-4 text-violet-600" />
            <span>—</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span>—</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Camera Proctoring */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="size-9 rounded-full bg-violet-100 text-violet-700 font-extrabold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Camera Proctoring
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Allow camera access to begin the proctoring process.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pl-13">
          {/* Left Info Box */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-violet-50/60 border border-violet-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-violet-100 text-violet-600 shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              We need access to your webcam to monitor the exam and ensure a fair environment.
            </p>
          </div>

          {/* Right Live Camera Preview Container */}
          <div className="lg:col-span-7 space-y-2">
            <div className="relative w-full h-56 rounded-2xl bg-slate-900 overflow-hidden shadow-md border-2 border-slate-800 flex items-center justify-center">
              {/* Blank camera placeholder */}
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Camera preview</span>
              </div>

              {/* LIVE Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-slate-700">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">
                  LIVE
                </span>
              </div>

              {/* Change Camera Button */}
              <button
                type="button"
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-slate-800 transition cursor-pointer border border-slate-700"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Camera Detected Status & Change Camera Action */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                ✓ Camera detected
              </span>
              <button
                type="button"
                className="font-bold text-violet-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Change Camera</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* STEP 2: System & Internet Check */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="size-9 rounded-full bg-violet-100 text-violet-700 font-extrabold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              System & Internet Check
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Checking your system and internet connection...
            </p>
          </div>
        </div>

        {/* 5 Status Cards Grid */}
        <div className="pl-13 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Internet */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-xs font-bold text-slate-700 block">
                Internet Connection
              </span>
              <span className="text-xs font-extrabold text-emerald-600 mt-1 block">
                Excellent
              </span>
            </div>

            {/* Camera */}
            <div className="p-3.5 rounded-2xl bg-violet-50/60 border border-violet-100 text-center">
              <span className="text-xs font-bold text-slate-700 block">
                Camera
              </span>
              <span className="text-xs font-extrabold text-violet-600 mt-1 block">
                Connected
              </span>
            </div>

            {/* Microphone */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-xs font-bold text-slate-700 block">
                Microphone
              </span>
              <span className="text-xs font-extrabold text-emerald-600 mt-1 block">
                Connected
              </span>
            </div>

            {/* System Performance */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
              <span className="text-xs font-bold text-slate-700 block">
                System Performance
              </span>
              <span className="text-xs font-extrabold text-blue-600 mt-1 block">
                Good
              </span>
            </div>

            {/* Browser */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-xs font-bold text-slate-700 block">
                Browser
              </span>
              <span className="text-xs font-extrabold text-emerald-600 mt-1 block">
                Supported
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <span className="size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <span>All checks passed! You&apos;re all set to start the exam.</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* STEP 3: Ready to Begin */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="size-9 rounded-full bg-violet-100 text-violet-700 font-extrabold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Ready to Begin
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Once you click next, the exam will start and the timer will begin.
            </p>
          </div>
        </div>

        <div className="pl-13">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-100 text-violet-600 shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-600">
              Please ensure you are in a quiet place and won&apos;t be disturbed during the exam.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Next Action Button */}
      <button
        type="button"
        onClick={onProceedToLiveExam}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
      >
        <span>Next</span>
        <span>→</span>
      </button>
    </div>
  );
}
