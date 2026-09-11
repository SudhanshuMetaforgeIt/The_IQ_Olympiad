import React from "react";
import {
  Target,
  Award,
  Trophy,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { WHY_PARTICIPATE_BENEFITS } from "./olympiadsData";

export default function WhyParticipateSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "target":
        return <Target className="size-5 text-white stroke-[2.2]" />;
      case "certificate":
        return <Award className="size-4.5 text-purple-700 stroke-[2.2]" />;
      case "ranking":
        return <Trophy className="size-4.5 text-purple-700 stroke-[2.2]" />;
      case "scholarship":
        return <GraduationCap className="size-4.5 text-purple-700 stroke-[2.2]" />;
      case "skill":
        return <TrendingUp className="size-4.5 text-purple-700 stroke-[2.2]" />;
      default:
        return <Award className="size-4.5 text-purple-700 stroke-[2.2]" />;
    }
  };

  const primaryItem = WHY_PARTICIPATE_BENEFITS[0];
  const otherItems = WHY_PARTICIPATE_BENEFITS.slice(1);

  return (
    <section className="mt-14 mb-10 rounded-3xl border border-purple-100/80 bg-gradient-to-br from-purple-50/40 via-white to-fuchsia-50/30 p-6 sm:p-7 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
        {/* Main "Why Participate?" Column with right border on desktop */}
        <div className="flex items-center gap-3.5 lg:pr-6 lg:border-r lg:border-purple-100">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 text-white shadow-md shadow-purple-600/25">
            {getIcon(primaryItem.iconName)}
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              {primaryItem.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-600 leading-snug">
              {primaryItem.description}
            </p>
          </div>
        </div>

        {/* Supporting 4 Pillars */}
        {otherItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-white/80 transition-colors">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-100/90 text-purple-700 shadow-2xs">
              {getIcon(item.iconName)}
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 tracking-tight">
                {item.title}
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

