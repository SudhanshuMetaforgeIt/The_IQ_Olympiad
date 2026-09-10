import React from "react";
import { Calendar, Clock, BarChart2 } from "lucide-react";
import { OlympiadItem } from "./types";

interface CardStatsRowProps {
  olympiad: OlympiadItem;
  isHighlighted: boolean;
}

export default function CardStatsRow({
  olympiad,
  isHighlighted,
}: CardStatsRowProps) {
  return (
    <div
      className={`mt-4 grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl border transition-colors ${isHighlighted
          ? "border-white/15 bg-white/10 backdrop-blur-xs"
          : "border-slate-100 bg-slate-50/70"
        }`}
    >
      {/* Exam Date */}
      <div className="flex items-center gap-2">
        <div
          className={`flex size-7 items-center justify-center rounded-lg shrink-0 transition-colors ${isHighlighted ? "bg-white/20 text-white" : "bg-purple-100/70 text-purple-700"
            }`}
        >
          <Calendar className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-[9.5px] font-bold uppercase tracking-wider ${isHighlighted ? "text-purple-200" : "text-slate-400"
              }`}
          >
            Date
          </span>
          <span
            className={`text-xs font-bold truncate ${isHighlighted ? "text-white" : "text-slate-800"
              }`}
          >
            {olympiad.examDate}
          </span>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2">
        <div
          className={`flex size-7 items-center justify-center rounded-lg shrink-0 transition-colors ${isHighlighted ? "bg-white/20 text-white" : "bg-purple-100/70 text-purple-700"
            }`}
        >
          <Clock className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-[9.5px] font-bold uppercase tracking-wider ${isHighlighted ? "text-purple-200" : "text-slate-400"
              }`}
          >
            Duration
          </span>
          <span
            className={`text-xs font-bold truncate ${isHighlighted ? "text-white" : "text-slate-800"
              }`}
          >
            {olympiad.duration}
          </span>
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex items-center gap-2">
        <div
          className={`flex size-7 items-center justify-center rounded-lg shrink-0 transition-colors ${isHighlighted ? "bg-white/20 text-white" : "bg-purple-100/70 text-purple-700"
            }`}
        >
          <BarChart2 className="size-3.5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-[9.5px] font-bold uppercase tracking-wider ${isHighlighted ? "text-purple-200" : "text-slate-400"
              }`}
          >
            Level
          </span>
          <span
            className={`text-xs font-bold truncate ${isHighlighted ? "text-white" : "text-slate-800"
              }`}
          >
            {olympiad.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}

