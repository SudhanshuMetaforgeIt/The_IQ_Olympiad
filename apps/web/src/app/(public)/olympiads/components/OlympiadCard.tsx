import React from "react";
import { FlaskConical, BookOpen, Cpu, Brain, Sparkles, Calendar } from "lucide-react";
import { OlympiadItem } from "./types";
import CardStatsRow from "./CardStatsRow";
import CardActionsRow from "./CardActionsRow";

interface OlympiadCardProps {
  olympiad: OlympiadItem;
  isHighlighted: boolean;
  onSelect: () => void;
}

export default function OlympiadCard({
  olympiad,
  isHighlighted,
  onSelect,
}: OlympiadCardProps) {
  const getIcon = () => {
    switch (olympiad.iconType) {
      case "sigma":
        return <span className="text-xl font-black font-serif leading-none">Σ</span>;
      case "flask":
        return <FlaskConical className="size-5" />;
      case "book":
        return <BookOpen className="size-5" />;
      case "ai":
        return <Cpu className="size-5" />;
      default:
        return <Brain className="size-5" />;
    }
  };

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      style={
        isHighlighted
          ? { background: "linear-gradient(135deg, #2e0854 0%, #470d82 45%, #65129b 100%)" }
          : undefined
      }
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-300 select-none ${isHighlighted
        ? "text-white shadow-xl shadow-purple-950/25 border-2 border-purple-400 ring-2 ring-purple-400/40"
        : "border border-slate-200/90 bg-white shadow-xs hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-300 hover:-translate-y-1.5"
        }`}
    >
      {/* Ambient Glow for highlighted card */}
      {isHighlighted && (
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-fuchsia-400/15 blur-2xl" />
      )}

      <div className="flex flex-col flex-1">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-11 items-center justify-center rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${isHighlighted
                ? "bg-white text-purple-900 shadow-md shadow-purple-950/30"
                : olympiad.customIconBg || "bg-purple-100 text-purple-700 shadow-2xs"
                }`}
            >
              {getIcon()}
            </div>
            <div>
              <h2
                className={`text-lg font-black tracking-tight transition-colors ${isHighlighted ? "text-white" : "text-slate-900 group-hover:text-purple-700"
                  }`}
              >
                {olympiad.name}
              </h2>
              <p
                className={`text-xs font-medium ${isHighlighted ? "text-purple-200" : "text-slate-500"
                  }`}
              >
                {olympiad.tagline}
              </p>
            </div>
          </div>

          {/* Status / Flagship Badge */}
          {olympiad.isFlagship ? (
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold shrink-0 shadow-2xs ${isHighlighted
                ? "bg-white/20 text-amber-200 border border-amber-300/40 backdrop-blur-sm"
                : "bg-gradient-to-r from-amber-50 to-purple-50 text-purple-900 border border-purple-200/80"
                }`}
            >
              <Sparkles className="size-3 fill-amber-400 text-amber-400 animate-pulse" />
              Flagship Event
            </span>
          ) : (
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold shrink-0 ${isHighlighted
                ? "bg-white/20 text-white border border-white/25 backdrop-blur-sm"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                }`}
            >
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {olympiad.status}
            </span>
          )}
        </div>

        {/* Tags & Registration Info */}
        <div className="mt-3.5 flex items-start justify-between gap-2 min-h-[40px] text-xs">
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {olympiad.subjects.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-0.5 text-[11px] font-semibold transition-colors ${isHighlighted
                  ? "bg-white/20 text-white backdrop-blur-sm border border-white/15"
                  : "bg-slate-100/90 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {olympiad.registrationDeadline && (
            <div
              className={`flex flex-col items-end text-[11px] leading-tight ${isHighlighted ? "text-purple-200" : "text-slate-500"
                }`}
            >
              <span
                className={`flex items-center gap-1 text-[10px] ${isHighlighted ? "text-purple-300" : "text-slate-400"
                  }`}
              >
                <Calendar className="size-3" /> Registration Deadline
              </span>
              <span
                className={`font-bold text-xs ${isHighlighted ? "text-white" : "text-slate-800"
                  }`}
              >
                {olympiad.registrationDeadline}
              </span>
              <span
                className={`text-[10px] ${isHighlighted ? "text-purple-300" : "text-slate-500"
                  }`}
              >
                Eligibility:{" "}
                <strong className={isHighlighted ? "text-white" : "text-slate-700"}>
                  {olympiad.eligibility}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Modular Stats Row */}
        <CardStatsRow olympiad={olympiad} isHighlighted={isHighlighted} />

        {/* Description */}
        <p
          className={`mt-3.5 text-xs leading-relaxed h-10 line-clamp-2 ${isHighlighted ? "text-purple-100/90" : "text-slate-600"
            }`}
        >
          {olympiad.description}
        </p>
      </div>

      {/* Modular Bottom Actions */}
      <CardActionsRow olympiad={olympiad} isHighlighted={isHighlighted} />
    </div>
  );
}
