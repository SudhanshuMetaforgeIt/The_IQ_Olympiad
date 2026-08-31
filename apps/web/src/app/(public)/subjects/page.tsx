"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHero } from "../_components/common/PageHero";

const SUBJECTS_CATALOG = [
  {
    title: "Mathematics",
    slug: "mathematics",
    icon: "🧮",
    level: "Classes 7–12",
    accent: "from-blue-600 to-indigo-600",
    bg: "bg-blue-50/60 border-blue-100",
    textAccent: "text-blue-700",
    description: "Number theory, algebra, Euclidean geometry, combinatorics, and trigonometry.",
  },
  {
    title: "Science",
    slug: "science",
    icon: "🔬",
    level: "Classes 7–12",
    accent: "from-purple-600 to-fuchsia-600",
    bg: "bg-purple-50/60 border-purple-100",
    textAccent: "text-purple-700",
    description: "Physics mechanics, chemical reactions, cell biology, environmental systems, and astronomy.",
  },
  {
    title: "English",
    slug: "english",
    icon: "📚",
    level: "Classes 7–12",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50/60 border-amber-100",
    textAccent: "text-amber-700",
    description: "Advanced vocabulary, structural grammar, reading comprehension, and literary analysis.",
  },
  {
    title: "Reasoning",
    slug: "reasoning",
    icon: "🧩",
    level: "Classes 7–12",
    accent: "from-emerald-600 to-teal-600",
    bg: "bg-emerald-50/60 border-emerald-100",
    textAccent: "text-emerald-700",
    description: "Analytical logic, spatial reasoning, coding-decoding, sequence puzzles, and blood relations.",
  },
  {
    title: "Artificial Intelligence",
    slug: "ai",
    icon: "🤖",
    level: "Classes 7–12",
    accent: "from-pink-600 to-rose-600",
    bg: "bg-pink-50/60 border-pink-100",
    textAccent: "text-pink-700",
    description: "Machine learning basics, neural networks, ethics in AI, prompt engineering, and Python logic.",
  },
];

export default function SubjectsPage() {
  const [selectedClass, setSelectedClass] = useState("ALL");

  return (
    <main className="min-h-screen bg-slate-50/50 pb-24">
      <PageHero
        badge="CURRICULUM & SUBJECTS"
        title="Explore Olympiad Subjects"
        description="Master core academic disciplines with class-specific syllabus mapping, AI practice sets, and mock Olympiad examinations."
      >
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {["ALL", "Classes 1–4", "Classes 5–8", "Classes 9–12"].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedClass === cls
                  ? "bg-purple-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-purple-100"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECTS_CATALOG.map((sub) => (
            <div
              key={sub.slug}
              className={`p-8 rounded-3xl border transition-all hover:shadow-xl flex flex-col justify-between group ${sub.bg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                    {sub.icon}
                  </span>
                  <span className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 ${sub.textAccent}`}>
                    {sub.level}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-purple-900 transition-colors">
                  {sub.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                  {sub.description}
                </p>
              </div>

              <Link href={`/subjects/${sub.slug}`}>
                <button
                  type="button"
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${sub.accent} text-white font-extrabold text-xs shadow-md transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2` }
                >
                  View Full Syllabus & Practice
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
