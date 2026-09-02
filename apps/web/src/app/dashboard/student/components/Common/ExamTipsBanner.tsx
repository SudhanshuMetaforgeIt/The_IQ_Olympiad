import type { ExamTipItem } from "../../types";
import { LightbulbIcon } from "./icons";

interface ExamTipsBannerProps {
  tip: ExamTipItem;
}

export function ExamTipsBanner({ tip }: ExamTipsBannerProps) {
  return (
    <div className="bg-indigo-50/70 border border-indigo-100/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl shrink-0 shadow-md shadow-indigo-600/20">
          <LightbulbIcon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{tip.title}</h4>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {tip.content}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="shrink-0 bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-indigo-200 shadow-sm transition-all self-end sm:self-center"
      >
        View All Tips
      </button>
    </div>
  );
}
