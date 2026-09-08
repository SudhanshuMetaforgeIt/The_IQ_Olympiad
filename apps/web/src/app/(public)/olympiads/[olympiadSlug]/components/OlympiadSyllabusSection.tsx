import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Atom, FlaskConical, Leaf, Check, Calculator, Cpu } from "lucide-react";
import { DetailedOlympiadInfo, DetailSubjectCategory } from "../data/olympiadDetailData";

interface OlympiadSyllabusSectionProps {
  data: DetailedOlympiadInfo;
}

export default function OlympiadSyllabusSection({ data }: OlympiadSyllabusSectionProps) {
  const getSubjectIcon = (iconType: string, color: string) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      green: "bg-emerald-100 text-emerald-600",
      amber: "bg-amber-100 text-amber-600",
    }[color] || "bg-purple-100 text-purple-600";

    const iconNode = (() => {
      switch (iconType) {
        case "atom":
          return <Atom className="size-4" />;
        case "flask":
          return <FlaskConical className="size-4" />;
        case "leaf":
          return <Leaf className="size-4" />;
        case "ai":
          return <Cpu className="size-4" />;
        default:
          return <Calculator className="size-4" />;
      }
    })();

    return (
      <div className={`flex size-8 items-center justify-center rounded-full ${colorClasses}`}>
        {iconNode}
      </div>
    );
  };

  const getCardBg = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-100 bg-[#f4f8ff]/70";
      case "purple":
        return "border-purple-100 bg-[#fbf6ff]/70";
      case "green":
        return "border-emerald-100 bg-[#f2fcf5]/70";
      default:
        return "border-slate-100 bg-slate-50/70";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs mt-6">
      {/* Header with Title and "View Full Syllabus" */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <BookOpen className="size-4.5 stroke-[2.2]" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Syllabus
          </h2>
        </div>

        <Link
          href="#syllabus"
          className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors"
        >
          <span>View Full Syllabus</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* 3 Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.syllabus.map((sub: DetailSubjectCategory, idx: number) => (
          <div
            key={idx}
            className={`rounded-2xl border p-4.5 flex flex-col justify-between ${getCardBg(sub.color)}`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                {getSubjectIcon(sub.iconType, sub.color)}
                <h3 className="text-xs font-black text-slate-900">{sub.title}</h3>
              </div>

              <ul className="space-y-2">
                {sub.topics.map((topic: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Check className="size-3.5 text-purple-600 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
