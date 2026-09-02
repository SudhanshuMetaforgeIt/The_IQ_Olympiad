"use client";

import React from "react";
import type { OlympiadExam } from "./types";
import type { ExamRegistrationData } from "../../Common/ExamRegistrationModal";

interface OlympiadCardProps {
  exam: OlympiadExam;
  isRegistered: boolean;
  cyberCountdown: string;
  onRegister: (exam: ExamRegistrationData) => void;
  onViewResults: () => void;
}

export function OlympiadCard({
  exam,
  isRegistered,
  cyberCountdown,
  onRegister,
  onViewResults,
}: OlympiadCardProps) {
  return (
    <div className="py-3 first:pt-1 last:pb-1 flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4">
      {/* Left Side: Icon + Details */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div
          className={`size-11 sm:size-12 rounded-xl ${exam.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
        >
          {exam.icon}
        </div>

        <div className="space-y-0.5 min-w-0">
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
            {exam.title}
          </h2>
          <p className="text-[11px] font-medium text-slate-500 leading-tight line-clamp-1 max-w-2xl">
            {exam.description}
          </p>

          {/* Metadata Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-[11px] font-semibold text-slate-600">
            {exam.status === "completed" && exam.scorePercentage !== undefined ? (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200 text-[10px]">
                <svg className="w-3 h-3 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Score: {exam.scorePercentage}%</span>
              </div>
            ) : null}

            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>{exam.date}</span>
            </div>

            <span className="text-slate-300 font-normal">|</span>

            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{exam.time}</span>
            </div>

            <span className="text-slate-300 font-normal">|</span>

            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{exam.duration}</span>
            </div>

            <span className="text-slate-300 font-normal">|</span>

            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{exam.questions} Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Divider + Status/Countdown + Action Button */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0 self-start sm:self-center">
        {/* Vertical Divider */}
        <div className="hidden xl:block w-[1px] h-9 bg-slate-200" />

        {/* Status Badge & Countdown */}
        <div className="text-center min-w-[85px]">
          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            isRegistered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : exam.statusBg
          }`}>
            {isRegistered ? "Registered" : exam.status === "upcoming" ? "Upcoming" : exam.status === "ongoing" ? "Ongoing" : "Completed"}
          </span>

          <div className="mt-0.5">
            <span className="text-[9px] font-semibold text-slate-500 block">
              {exam.countdownSubtext}
            </span>
            <span className={`text-base sm:text-lg font-black ${exam.countdownColor} block tracking-tight leading-none mt-0.5`}>
              {exam.status === "ongoing" ? cyberCountdown : exam.countdownText}
            </span>
          </div>
        </div>

        {/* Action Button & Green Tick Confirmation */}
        <div>
          {exam.status === "completed" ? (
            <button
              type="button"
              onClick={onViewResults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-violet-300 text-violet-700 font-bold text-xs hover:bg-violet-50 transition cursor-pointer shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              <span>View Results</span>
              <span className="text-xs">›</span>
            </button>
          ) : isRegistered ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs shadow-2xs">
              <div className="size-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
                ✓
              </div>
              <span>Registered</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                onRegister({
                  id: exam.id,
                  title: exam.title,
                  description: exam.description,
                  date: exam.date,
                  time: exam.time,
                  duration: exam.duration,
                  questions: exam.questions,
                  marks: exam.marks,
                })
              }
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="m9 14 2 2 4-4" />
              </svg>
              <span>Register for Exam</span>
              <span className="text-xs">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
