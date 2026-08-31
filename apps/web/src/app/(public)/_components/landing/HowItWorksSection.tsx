"use client";

import React from "react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Choose your goal",
      description: "Pick a class, subject or upcoming Olympiad.",
    },
    {
      number: "02",
      title: "Practise intelligently",
      description: "Get focused practice and useful recommendations.",
    },
    {
      number: "03",
      title: "Compete & improve",
      description: "Attempt real exams, review results and climb ranks.",
    },
  ];

  return (
    <section className="py-12 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white shadow-2xl shadow-purple-950/20">
          <h2 className="text-3xl sm:text-4xl font-black text-center tracking-tight mb-12 text-white">
            How THE IQ OLYMPIAD Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <span className="text-5xl sm:text-6xl font-black text-purple-300/40 mb-3 tracking-tighter">
                  {step.number}
                </span>
                <h3 className="text-xl font-black text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-100/80 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
