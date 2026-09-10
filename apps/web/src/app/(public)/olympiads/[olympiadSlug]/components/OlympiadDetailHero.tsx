import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, GraduationCap, Users, FlaskConical, BookOpen, Brain, Cpu, Sparkles } from "lucide-react";
import { DetailedOlympiadInfo } from "../data/olympiadDetailData";
import OlympiadHeroIllustration from "./OlympiadHeroIllustration";

interface OlympiadDetailHeroProps {
  data: DetailedOlympiadInfo;
}

export default function OlympiadDetailHero({ data }: OlympiadDetailHeroProps) {
  const renderIcon = () => {
    switch (data.slug) {
      case "nso":
        return <FlaskConical className="size-8 text-emerald-600 stroke-[2]" />;
      case "imo":
        return <span className="text-3xl font-black font-serif leading-none">Σ</span>;
      case "intelliquest-2026":
      case "intelliquest-2025":
        return <Brain className="size-8 text-indigo-600 stroke-[2]" />;
      case "ieo":
        return <BookOpen className="size-8 text-rose-600 stroke-[2]" />;
      case "nco":
        return <Brain className="size-8 text-violet-600 stroke-[2]" />;
      case "ai-olympiad":
        return <Cpu className="size-8 text-indigo-600 stroke-[2]" />;
      default:
        return <BookOpen className="size-8 text-purple-600 stroke-[2]" />;
    }
  };


  return (
    <div className="mb-8">
      {/* Top Back Navigation (Symbol Only) */}
      <Link
        href="/olympiads"
        className="inline-flex items-center justify-center size-8 rounded-lg text-slate-700 hover:text-purple-700 hover:bg-slate-200/60 transition-colors mb-4 group cursor-pointer"
        aria-label="Back to Olympiads"
        title="Back to Olympiads"
      >
        <ArrowLeft className="size-5 stroke-[2.2] group-hover:-translate-x-0.5 transition-transform" />
      </Link>

      {/* Main Hero Container */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Info Column */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-start gap-5 mb-6">
            {/* Big Rounded Icon */}
            <div
              className={`flex size-16 sm:size-20 items-center justify-center rounded-3xl shrink-0 shadow-xs ${data.iconBgColor}`}
            >
              {renderIcon()}
            </div>

            {/* Title & Badge */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-200/70">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {data.badgeText}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {data.name}
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight mt-0.5">
                {data.subtitle}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                {data.description}
              </p>
            </div>
          </div>

          {/* 4 Stats Row with vertical dividers */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 px-2 mb-6 border-y border-slate-100">
            {/* Exam Date */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <Calendar className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Exam Date</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{data.examDate}</span>
              </div>
            </div>
            <div className="hidden sm:block h-7 w-px bg-slate-200/80" />

            {/* Duration */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <Clock className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Duration</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{data.duration}</span>
              </div>
            </div>
            <div className="hidden sm:block h-7 w-px bg-slate-200/80" />

            {/* Classes */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <GraduationCap className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Classes</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{data.classes}</span>
              </div>
            </div>
            <div className="hidden sm:block h-7 w-px bg-slate-200/80" />

            {/* Participants */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <Users className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Participants</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{data.participants}</span>
              </div>
            </div>
          </div>

          {/* Register CTA Button */}
          <div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-8 py-3 text-xs font-black text-white hover:brightness-105 shadow-md shadow-purple-600/30 transition-all active:scale-95"
            >
              <span>Register Now</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="w-full lg:w-auto flex justify-center shrink-0">
          <OlympiadHeroIllustration slug={data.slug} />
        </div>
      </div>
    </div>
  );
}
