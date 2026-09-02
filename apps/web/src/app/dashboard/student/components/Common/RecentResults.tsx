import React from "react";
import type { ExamResultItem } from "../../types";
import { FlaskIcon, MathCalcIcon, TrophyLogoIcon } from "./icons";

interface RecentResultsProps {
  results: ExamResultItem[];
  onViewAll?: () => void;
  onSelectResult?: (item: ExamResultItem) => void;
}

export function RecentResults({ results, onViewAll, onSelectResult }: RecentResultsProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Recent Results</h3>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-violet-600 hover:text-violet-800 transition cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {results.map((item) => (
            <ResultItemRow
              key={item.id}
              item={item}
              onClick={() => onSelectResult ? onSelectResult(item) : onViewAll?.()}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <button
        type="button"
        onClick={onViewAll}
        className="w-full mt-2 bg-white border border-violet-200 text-violet-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-violet-50/60 transition-colors text-center cursor-pointer shadow-2xs"
      >
        View All Results
      </button>
    </div>
  );
}

function ResultItemRow({ item, onClick }: { item: ExamResultItem; onClick?: () => void }) {
  const getSubjectIcon = () => {
    switch (item.subjectIcon) {
      case "science":
        return <FlaskIcon className="w-4.5 h-4.5 text-emerald-600" />;
      case "math":
        return <MathCalcIcon className="w-4.5 h-4.5 text-indigo-600" />;
      default:
        return <TrophyLogoIcon className="w-4.5 h-4.5 text-indigo-600" />;
    }
  };

  const getIconBg = () => {
    return item.subjectIcon === "science" ? "bg-emerald-100/70" : "bg-indigo-100/70";
  };

  const getBadgeStyle = () => {
    return item.badgeVariant === "gold"
      ? "bg-amber-100/80 text-amber-800 border-amber-200"
      : "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/20 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${getIconBg()} shrink-0`}>
          {getSubjectIcon()}
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            {item.title}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            {item.completedDate}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
              <span>🏆</span> Rank: {item.rank}
            </span>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${getBadgeStyle()}`}
            >
              {item.badgeName}
            </span>
          </div>
        </div>
      </div>

      {/* Percentage Score */}
      <div className="text-right pl-2">
        <span className="text-lg sm:text-xl font-extrabold text-emerald-600 block">
          {item.scorePercentage}%
        </span>
        <span className="text-[9px] font-semibold text-slate-400 block uppercase">
          Score
        </span>
      </div>
    </div>
  );
}
