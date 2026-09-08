import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { OlympiadItem } from "./types";

interface CardActionsRowProps {
  olympiad: OlympiadItem;
  isHighlighted: boolean;
}

export default function CardActionsRow({
  olympiad,
  isHighlighted,
}: CardActionsRowProps) {
  return (
    <div
      className={`mt-5 flex items-center justify-between gap-3 pt-3.5 border-t ${isHighlighted ? "border-white/15" : "border-slate-100"
        }`}
    >
      <div className="flex items-center gap-2">
        <Link
          href={`/olympiads/${olympiad.slug}`}
          onClick={(e) => e.stopPropagation()}
          className={`group/btn flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-2xs active:scale-95 ${isHighlighted
            ? "bg-white/20 text-white hover:bg-white/30 border border-white/20"
            : "border border-slate-200/90 bg-white text-slate-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/40"
            }`}
        >
          <span>View Details</span>
          <ArrowRight
            className={`size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${isHighlighted ? "text-white" : "text-slate-400 group-hover/btn:text-purple-600"
              }`}
          />
        </Link>
        {olympiad.status === "Upcoming" && (
          <Link
            href="/signup"
            onClick={(e) => e.stopPropagation()}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all active:scale-95 shadow-sm ${isHighlighted
              ? "bg-white text-purple-950 hover:bg-purple-50 shadow-md shadow-purple-950/20"
              : "bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 text-white hover:brightness-105 shadow-purple-600/25 hover:shadow-purple-600/40"
              }`}
          >
            Register Now
          </Link>
        )}
      </div>

      <div
        className={`flex items-center gap-1.5 text-xs font-bold ${isHighlighted ? "text-white" : "text-slate-600"
          }`}
      >
        <Trophy
          className={`size-4 shrink-0 ${isHighlighted
            ? "text-amber-300 fill-amber-300/30"
            : "text-amber-500 fill-amber-400/20"
            }`}
        />
        <span className="truncate">
          {olympiad.hasPrizes ? "Prizes & Certificates" : "Certificates"}
        </span>
      </div>
    </div>
  );
}

