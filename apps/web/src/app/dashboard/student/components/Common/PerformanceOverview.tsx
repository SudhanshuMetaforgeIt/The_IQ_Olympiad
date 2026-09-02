import type { PerformanceSubjectMetric } from "../../types";
import { ChevronDownIcon } from "./icons";

interface PerformanceOverviewProps {
  metrics: PerformanceSubjectMetric[];
  onViewDetails?: () => void;
}

export function PerformanceOverview({ metrics, onViewDetails }: PerformanceOverviewProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        {/* Header with Filter Dropdown */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Performance Overview
          </h3>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg hover:bg-slate-200/80 transition-colors"
          >
            <span>This Year</span>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Bar Chart Visualization */}
        <div className="relative pt-4 pb-2">
          {/* Background Y-Axis Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pointer-events-none pb-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span>100%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span>75%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span>50%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span>25%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span>0%</span>
            </div>
          </div>

          {/* Vertical Bars */}
          <div className="relative h-36 flex items-end justify-around pl-7 z-10">
            {metrics.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-1.5 group h-full justify-end"
              >
                {/* Score label above bar */}
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-tight group-hover:scale-110 transition-transform">
                  {item.percentage}%
                </span>
                {/* Bar Graphic */}
                <div
                  className={`w-8 sm:w-9 rounded-t-xl ${item.barColorClass} transition-all duration-500 group-hover:brightness-110 shadow-2xs`}
                  style={{ height: `${item.percentage}%` }}
                />
                {/* Subject Label below bar */}
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 max-w-[65px] text-center leading-tight mt-1 truncate">
                  {item.subject}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <button
        type="button"
        onClick={onViewDetails}
        className="w-full mt-2 bg-white border border-indigo-200 text-indigo-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-indigo-50/60 transition-colors text-center cursor-pointer shadow-2xs"
      >
        Detailed Performance
      </button>
    </div>
  );
}
