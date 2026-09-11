"use client";

import React from "react";

const FEATURES = [
  { icon: "🤖", title: "AI-Powered Practice", desc: "Get personalized practice questions and instant feedback powered by AI.", bg: "bg-blue-100 text-blue-600" },
  { icon: "📖", title: "Class-Specific Syllabus", desc: "Curriculum mapped to each class for focused and effective preparation.", bg: "bg-purple-100 text-purple-600" },
  { icon: "📋", title: "Mock Examinations", desc: "Take realistic mock tests to build confidence and improve performance.", bg: "bg-amber-100 text-amber-600" },
  { icon: "🛡️", title: "AI Proctoring", desc: "Advanced AI monitoring ensures a fair and secure examination environment.", bg: "bg-rose-100 text-rose-600" },
  { icon: "⚡", title: "Instant Results", desc: "Get your scores immediately after the exam.", bg: "bg-emerald-100 text-emerald-600" },
  { icon: "📊", title: "Performance Analytics", desc: "Detailed insights to track your progress and identify improvement areas.", bg: "bg-blue-100 text-blue-600" },
  { icon: "🎖️", title: "National/Global Ranking", desc: "Compete with students across the country and world.", bg: "bg-purple-100 text-purple-600" },
  { icon: "📜", title: "Certificates & Achievements", desc: "Earn certificates and showcase your achievements.", bg: "bg-orange-100 text-orange-600" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-24">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-purple-100 text-purple-700 mb-2.5">
          MORE THAN JUST AN EXAM
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Why The IQ Olympiad?
        </h2>
        <p className="text-sm sm:text-base text-slate-500 font-medium">
          A smarter, safer, and more effective way to prepare for academic success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center"
          >
            <div className={`size-14 rounded-full ${f.bg} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
              {f.icon}
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
            <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
