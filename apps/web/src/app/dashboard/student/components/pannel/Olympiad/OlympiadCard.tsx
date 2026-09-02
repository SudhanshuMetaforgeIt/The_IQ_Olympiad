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
    <div className="py-6 first:pt-2 last:pb-2 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
      {/* Left: Big Icon Circle + Details */}
      <div className="flex items-center gap-5 sm:gap-6 flex-1 min-w-0">
        {/* Big Soft Rounded Icon */}
        <div
          className={`size-20 sm:size-22 rounded-full ${exam.iconBg} flex items-center justify-center shrink-0 shadow-xs`}
        >
          {exam.icon}
        </div>

        {/* Content Column */}
        <div className="space-y-1.5 min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {exam.title}
          </h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
            {exam.description}
          </p>

          {/* Metadata Chips */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-sm font-semibold text-slate-700">
            {exam.status === "completed" && exam.scorePercentage !== undefined ? (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Score: {exam.scorePercentage}%</span>
              </div>
            ) : null}

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>{exam.date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{exam.time}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
              </svg>
              <span>{exam.duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h6" />
              </svg>
              <span>{exam.questions} Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Divider + Status/Countdown + Action Button */}
      <div className="flex items-center gap-6 sm:gap-10 shrink-0 self-start sm:self-center">
        {/* Vertical Divider */}
        <div className="hidden xl:block w-[1px] h-16 bg-slate-200" />

        {/* Status Badge & Big Countdown / Percentage */}
        <div className="text-center min-w-[110px]">
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-md border ${
            isRegistered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : exam.statusBg
          }`}>
            {isRegistered ? "Registered" : exam.status === "upcoming" ? "Upcoming" : exam.status === "ongoing" ? "Ongoing" : "Completed"}
          </span>

          <div className="mt-2">
            <span className="text-xs font-semibold text-slate-500 block">
              {exam.countdownSubtext}
            </span>
            <span className={`text-2xl font-black ${exam.countdownColor} block tracking-tight`}>
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
              className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white border-2 border-violet-300 text-violet-700 font-extrabold text-base hover:bg-violet-50 transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              <span>View Results</span>
              <span className="text-lg">›</span>
            </button>
          ) : isRegistered ? (
            /* Right side green tick mark badge when registered */
            <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-700 font-extrabold text-base shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="size-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Registered</span>
            </div>
          ) : (
            /* Register for Exam button triggers registration modal */
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
              className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-extrabold text-base shadow-lg shadow-violet-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="m9 14 2 2 4-4" />
              </svg>
              <span>Register for Exam</span>
              <span className="text-lg">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
