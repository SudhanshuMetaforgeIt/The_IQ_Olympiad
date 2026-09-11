"use client";

import React from "react";
import Link from "next/link";

export default function ExploreSubjectsSection() {
  const subjects = [
    {
      title: "Mathematics",
      description: "Concept practice, quizzes and Olympiad preparation.",
      symbol: "π",
    },
    {
      title: "Science",
      description: "Concept practice, quizzes and Olympiad preparation.",
      symbol: (
        <svg className="size-6 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(-30 12 12)" />
        </svg>
      ),
    },
    {
      title: "English",
      description: "Concept practice, quizzes and Olympiad preparation.",
      symbol: "Aa",
    },
    {
      title: "Reasoning",
      description: "Concept practice, quizzes and Olympiad preparation.",
      symbol: "❖",
    },
  ];

  return (
    <section className="py-14 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-9">
          <div>
            <span className="text-sm sm:text-base font-black text-purple-900 tracking-wider uppercase mb-2 block">
              BUILD YOUR EDGE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Explore by subject
            </h2>
          </div>
          <Link
            href="/subjects"
            className="text-sm sm:text-base font-black text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            See all subjects →
          </Link>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((sub, idx) => (
            <Link
              key={idx}
              href="/subjects"
              className="p-8 rounded-3xl bg-slate-50/70 border border-slate-100 hover:bg-purple-50/50 hover:border-purple-200 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="size-14 rounded-full bg-gradient-to-tr from-purple-800 to-purple-600 text-white font-extrabold text-xl flex items-center justify-center mb-6 shadow-md shadow-purple-600/20 group-hover:scale-110 transition-transform">
                  {sub.symbol}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2.5 group-hover:text-purple-900 transition-colors">
                  {sub.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                  {sub.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
