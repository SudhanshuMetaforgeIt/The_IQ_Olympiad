import type { StatItem } from "../../types";
import {
  ExamsIcon,
  CheckCircleIcon,
  CrownIcon,
  BadgeMedalIcon,
} from "./icons";

interface StatsRowProps {
  stats: StatItem[];
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export function StatsRow({ stats, onSelectTab }: StatsRowProps) {
  const handleCardClick = (stat: StatItem) => {
    if (!onSelectTab) return;
    if (stat.iconType === "registered") {
      onSelectTab("olympiad", "registered");
    } else if (stat.iconType === "completed") {
      onSelectTab("olympiad", "completed");
    } else if (stat.iconType === "rank") {
      onSelectTab("results");
    } else if (stat.iconType === "badges") {
      onSelectTab("certificates");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} onClick={() => handleCardClick(stat)} />
      ))}
    </div>
  );
}

function StatCard({ stat, onClick }: { stat: StatItem; onClick?: () => void }) {
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
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all flex items-center gap-4 cursor-pointer group"
    >
      <div className={`p-3.5 rounded-xl ${bgClass} shrink-0 group-hover:scale-105 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-slate-500 block truncate group-hover:text-violet-600 transition-colors">
          {stat.title}
        </span>
        <span className="text-2xl font-black text-slate-900 block mt-0.5">
          {stat.value}
        </span>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[11px] font-medium text-slate-400 block truncate">
            {stat.subtext}
          </span>
          <span className="text-xs font-bold text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </div>
    </div>
  );
}
