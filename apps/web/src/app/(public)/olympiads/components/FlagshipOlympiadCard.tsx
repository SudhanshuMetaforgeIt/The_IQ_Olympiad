import React from "react";
import Link from "next/link";
import {
  Brain,
  Calendar,
  Clock,
  BarChart2,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { OlympiadItem } from "./types";

interface FlagshipOlympiadCardProps {
  olympiad: OlympiadItem;
}

export default function FlagshipOlympiadCard({
  olympiad,
}: FlagshipOlympiadCardProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #320766 0%, #4d0e8a 45%, #6a14a8 100%)",
      }}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-purple-950/20 border border-purple-400/20 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col flex-1">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-md shrink-0">
              <Brain className="size-5 text-purple-700" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">
                {olympiad.name}
              </h2>
              <p className="text-xs font-medium text-purple-200">
                {olympiad.tagline}
              </p>
            </div>
          </div>

          {/* Flagship Badge */}
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur-md border border-white/20 shadow-sm shrink-0">
            <Sparkles className="size-3 fill-amber-300 text-amber-300" />
            Flagship Event
          </span>
        </div>

        {/* Tags & Right Meta Block */}
        <div className="mt-3.5 flex items-start justify-between gap-2 min-h-[40px] text-xs">
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {olympiad.subjects.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {olympiad.registrationDeadline && (
            <div className="flex flex-col items-end text-[11px] text-purple-200 leading-tight">
              <span className="flex items-center gap-1 text-purple-300 text-[10px]">
                <Calendar className="size-3" /> Registration Deadline
              </span>
              <span className="font-bold text-white text-xs">
                {olympiad.registrationDeadline}
              </span>
              <span className="text-[10px] text-purple-300">
                Eligibility: <strong className="text-white">{olympiad.eligibility}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-purple-300 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-purple-300 font-medium">Exam Date</span>
              <span className="text-xs font-bold text-white truncate">
                {olympiad.examDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="size-4 text-purple-300 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-purple-300 font-medium">Duration</span>
              <span className="text-xs font-bold text-white">
                {olympiad.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <BarChart2 className="size-4 text-purple-300 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] text-purple-300 font-medium">Difficulty</span>
              <span className="text-xs font-bold text-white truncate">
                {olympiad.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Description (fixed 2 lines) */}
        <p className="mt-3.5 text-xs text-purple-100/90 leading-relaxed h-10 line-clamp-2">
          {olympiad.description}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-3.5">
        <div className="flex items-center gap-2">
          <Link
            href={`/olympiads/${olympiad.slug}`}
            className="flex items-center gap-1 rounded-xl bg-white px-3.5 py-2 text-xs font-extrabold text-purple-900 hover:bg-purple-50 transition-colors shadow-sm"
          >
            View Details
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2 text-xs font-extrabold text-white hover:opacity-95 shadow-md shadow-fuchsia-600/30 transition-opacity"
          >
            Register Now
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <Trophy className="size-4 text-amber-300" />
          <span>Prizes & Certificates</span>
        </div>
      </div>
    </div>
  );
}
