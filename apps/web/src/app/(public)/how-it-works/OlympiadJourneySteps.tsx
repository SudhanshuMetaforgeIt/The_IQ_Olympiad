"use client";

import React from "react";

const STEPS = [
  {
    num: 1,
    icon: "👤",
    title: "Create Your Account",
    border: "border-blue-100",
    bg: "bg-blue-50/50",
    numBg: "bg-blue-500",
    points: ["Sign up as a student", "Select your class", "Choose your preferred subjects"],
  },
  {
    num: 2,
    icon: "📚",
    title: "Choose Your Olympiad",
    border: "border-purple-100",
    bg: "bg-purple-50/50",
    numBg: "bg-purple-500",
    points: ["Explore available Olympiads", "Select Mathematics, Science, English, etc.", "View syllabus and eligibility"],
  },
  {
    num: 3,
    icon: "💻",
    title: "Prepare & Practice",
    border: "border-amber-100",
    bg: "bg-amber-50/50",
    numBg: "bg-amber-500",
    points: ["Study topic-wise content", "Practice AI-generated questions", "Take mock tests", "Track your performance"],
  },
  {
    num: 4,
    icon: "⏱️",
    title: "Take the Olympiad",
    border: "border-rose-100",
    bg: "bg-rose-50/50",
    numBg: "bg-rose-500",
    points: ["Start the online examination", "AI-powered proctoring monitors your environment", "Complete the exam within the allotted time"],
  },
  {
    num: 5,
    icon: "🏆",
    title: "Get Your Results",
    border: "border-emerald-100",
    bg: "bg-emerald-50/50",
    numBg: "bg-emerald-500",
    points: ["View your score and rank", "Analyze strengths and weaknesses", "Receive certificates", "Celebrate your achievements"],
  },
];

export default function OlympiadJourneySteps() {
  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-purple-100 text-purple-700 mb-2.5">
          GET STARTED IN 5 SIMPLE STEPS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Your Olympiad Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-500 font-medium">
          From sign up to success — here&apos;s how it works.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 relative">
        {STEPS.map((s, idx) => (
          <div key={s.num} className="relative flex flex-col">
            <div
              className={`h-full min-h-[420px] p-6 sm:p-7 rounded-3xl border ${s.border} ${s.bg} flex flex-col justify-between hover:shadow-xl transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`size-8 rounded-full ${s.numBg} text-white font-black text-sm flex items-center justify-center shadow-md`}
                  >
                    {s.num}
                  </span>
                </div>
                <div className="size-20 mx-auto rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-4xl mb-5">
                  {s.icon}
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 text-center mb-4">
                  {s.title}
                </h3>
                <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                  {s.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className={`size-2 rounded-full ${s.numBg} mt-1.5 shrink-0`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {idx < 4 && (
              <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 size-7 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center text-xs font-bold shadow-md">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
