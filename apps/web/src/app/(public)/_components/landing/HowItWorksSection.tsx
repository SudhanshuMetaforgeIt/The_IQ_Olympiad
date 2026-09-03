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
    <section className="py-14 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white shadow-2xl shadow-purple-950/20">
          <h2 className="text-4xl sm:text-5xl font-black text-center tracking-tight mb-14 text-white">
            How THE IQ OLYMPIAD Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <span className="text-6xl sm:text-7xl font-black text-purple-300/40 mb-4 tracking-tighter">
                  {step.number}
                </span>
                <h3 className="text-2xl font-black text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-purple-100/90 font-semibold leading-relaxed">
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
