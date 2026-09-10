import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  BarChart2,
  Trophy,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Cpu,
  Brain,
} from "lucide-react";
import { OlympiadItem } from "./types";

interface StandardOlympiadCardProps {
  olympiad: OlympiadItem;
}

export default function StandardOlympiadCard({
  olympiad,
}: StandardOlympiadCardProps) {
  const renderIcon = () => {
    switch (olympiad.iconType) {
      case "sigma":
        return <span className="text-xl font-bold font-serif leading-none">Σ</span>;
      case "flask":
        return <FlaskConical className="size-5 text-blue-600" />;
      case "book":
        return <BookOpen className="size-5 text-pink-600" />;
      case "cyber":
        return <Brain className="size-5 text-purple-600" />;
      case "ai":
        return <Cpu className="size-5 text-purple-600" />;
      default:
        return <Brain className="size-5 text-purple-600" />;
    }
  };

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col flex-1">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-11 items-center justify-center rounded-2xl shadow-2xs shrink-0 ${
                olympiad.customIconBg || "bg-purple-100 text-purple-700"
              }`}
            >
              {renderIcon()}
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
                {olympiad.name}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                {olympiad.tagline}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200/70 shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {olympiad.status}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-3.5 flex items-start gap-1.5 min-h-[40px] pt-0.5">
          {olympiad.subjects.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100/90 px-3 py-0.5 text-[11px] font-semibold text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-purple-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">Exam Date</span>
              <span className="text-xs font-bold text-slate-700 truncate">
                {olympiad.examDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="size-4 text-purple-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">Duration</span>
              <span className="text-xs font-bold text-slate-700">
                {olympiad.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <BarChart2 className="size-4 text-purple-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium">Difficulty</span>
              <span className="text-xs font-bold text-slate-700 truncate">
                {olympiad.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Description (fixed 2 lines) */}
        <p className="mt-3.5 text-xs text-slate-600 leading-relaxed h-10 line-clamp-2">
          {olympiad.description}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
        <div className="flex items-center gap-2">
          <Link
            href={`/olympiads/${olympiad.slug}`}
            className="flex items-center gap-1 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            View Details
            <ArrowRight className="size-3.5 text-slate-400" />
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-4 py-2 text-xs font-extrabold text-white hover:opacity-95 shadow-md shadow-purple-600/20 transition-opacity"
          >
            Register Now
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
          <Trophy className="size-3.5 text-purple-600" />
          <span>{olympiad.hasPrizes ? "Prizes & Certificates" : "Certificates"}</span>
        </div>
      </div>
    </div>
  );
}
