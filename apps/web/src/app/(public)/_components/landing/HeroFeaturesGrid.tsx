"use client";

import React from "react";

export default function HeroFeaturesGrid() {
  const features = [
    {
      title: "AI Practice",
      description: "Adaptive question sets tailored to every learner.",
      icon: (
        <svg className="size-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2L14.85 8.65L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.15 8.65L12 2Z" />
        </svg>
      ),
    },
    {
      title: "Live Olympiads",
      description: "Compete in timed exams and earn certificates.",
      icon: (
        <svg className="size-5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Leaderboards",
      description: "Track progress and celebrate personal bests.",
      icon: (
        <svg className="size-5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Exam integrity",
      description: "Fair browser-based monitoring, built transparently.",
      icon: (
        <svg className="size-5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Instant results",
      description: "Clear scores, accuracy and improvement insights.",
      icon: (
        <svg className="size-5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pb-16 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-100/80 hover:bg-purple-50/50 hover:border-purple-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="size-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-fuchsia-600 flex items-center justify-center mb-4 shadow-md shadow-purple-600/20">
                  {item.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
