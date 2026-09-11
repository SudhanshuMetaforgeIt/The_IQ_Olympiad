"use client";

import React from "react";

export default function OlympiadAndLeaderboardSection() {
  const upcomingOlympiads = [
    {
      title: "International Mathematics Olympiad",
      classes: "Classes 7–12 · Online",
      status: "Open",
      isPrimary: true,
    },
    {
      title: "Science Olympiad Foundation",
      classes: "Classes 7–12 · Online",
      status: "Soon",
      isPrimary: false,
    },
    {
      title: "English Talent Hunt",
      classes: "Classes 7–12 · Online",
      status: "Soon",
      isPrimary: false,
    },
  ];

  const topPerformers = [
    { rank: 1, name: "Aarav Sharma", grade: "Class 10", score: 15840 },
    { rank: 2, name: "Diya Verma", grade: "Class 9", score: 15430 },
    { rank: 3, name: "Rohan Patel", grade: "Class 8", score: 15020 },
    { rank: 4, name: "Ananya Iyer", grade: "Class 7", score: 14610 },
  ];

  return (
    <section className="py-14 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Upcoming Olympiads */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-100/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Upcoming Olympiads
                </h3>
                <div className="text-purple-600">
                  <svg className="size-7 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 3.84h3.84m-1.72-6.12a6 6 0 013.84-2.12v3.84" />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                {upcomingOlympiads.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-slate-200/60 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                        {item.classes}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${
                        item.isPrimary
                          ? "bg-purple-700 text-white"
                          : "bg-purple-900 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Top Performers */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-100/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Top performers
                </h3>
              </div>

              <div className="space-y-6">
                {topPerformers.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between border-b border-slate-200/60 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-9 rounded-full bg-purple-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                        {user.rank}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          {user.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold">
                          {user.grade}
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-black text-purple-900">
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
