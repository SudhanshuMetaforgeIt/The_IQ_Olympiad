import React from "react";
import { FileText, Search, Users, ClipboardList, Check } from "lucide-react";
import { DetailedOlympiadInfo } from "../data/olympiadDetailData";

interface OlympiadAboutSectionProps {
  data: DetailedOlympiadInfo;
}

export default function OlympiadAboutSection({ data }: OlympiadAboutSectionProps) {
  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
          <FileText className="size-4.5 stroke-[2.2]" />
        </div>
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
          About the Olympiad
        </h2>
      </div>

      {/* Paragraph Description */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
        {data.aboutText}
      </p>

      {/* 3 Sub-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Why Participate? */}
        <div className="rounded-2xl border border-blue-100 bg-[#f0f6ff]/70 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Search className="size-3.5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Why Participate?</h3>
            </div>
            <ul className="space-y-2">
              {data.whyParticipate.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug">
                  <Check className="size-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Eligibility */}
        <div className="rounded-2xl border border-purple-100 bg-[#f8f5ff]/70 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Users className="size-3.5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Eligibility</h3>
            </div>
            <ul className="space-y-2">
              {data.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-snug">
                  <Check className="size-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Exam Pattern */}
        <div className="rounded-2xl border border-emerald-100 bg-[#f0fdf4]/70 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ClipboardList className="size-3.5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Exam Pattern</h3>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between py-0.5 border-b border-emerald-100/60">
                <span className="text-slate-600 font-medium">Questions</span>
                <span className="font-bold text-slate-900">{data.examPattern.questions}</span>
              </div>
              <div className="flex items-center justify-between py-0.5 border-b border-emerald-100/60">
                <span className="text-slate-600 font-medium">Duration</span>
                <span className="font-bold text-slate-900">{data.examPattern.duration}</span>
              </div>
              <div className="flex items-center justify-between py-0.5 border-b border-emerald-100/60">
                <span className="text-slate-600 font-medium">Question Type</span>
                <span className="font-bold text-slate-900">{data.examPattern.questionType}</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-slate-600 font-medium">Negative Marking</span>
                <span className="font-bold text-slate-900">{data.examPattern.negativeMarking}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
