import type { StatItem } from "../../types";
import {
  ExamsIcon,
  CheckCircleIcon,
  CrownIcon,
  BadgeMedalIcon,
} from "./icons";

interface StatsRowProps {
  stats: StatItem[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  const getIconConfig = () => {
    switch (stat.iconType) {
      case "registered":
        return {
          icon: ExamsIcon,
          bgClass: "bg-blue-100/70 text-blue-600",
        };
      case "completed":
        return {
          icon: CheckCircleIcon,
          bgClass: "bg-emerald-100/70 text-emerald-600",
        };
      case "rank":
        return {
          icon: CrownIcon,
          bgClass: "bg-purple-100/70 text-purple-600",
        };
      case "badges":
        return {
          icon: BadgeMedalIcon,
          bgClass: "bg-amber-100/70 text-amber-600",
        };
      default:
        return {
          icon: ExamsIcon,
          bgClass: "bg-indigo-100/70 text-indigo-600",
        };
    }
  };

  const { icon: Icon, bgClass } = getIconConfig();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
      <div className={`p-3.5 rounded-xl ${bgClass} shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <span className="text-xs font-semibold text-slate-500 block">
          {stat.title}
        </span>
        <span className="text-2xl font-black text-slate-900 block mt-0.5">
          {stat.value}
        </span>
        <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
          {stat.subtext}
        </span>
      </div>
    </div>
  );
}
