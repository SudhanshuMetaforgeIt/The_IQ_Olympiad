"use client";

import { Users, CheckSquare, Clock, Calendar, CheckCircle } from "lucide-react";
import { StatMetric } from "../../_types/dashboard";

interface StatsSummaryProps {
  metrics: StatMetric[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  "check-square": CheckSquare,
  clock: Clock,
  calendar: Calendar,
  "check-circle": CheckCircle,
};

export function StatsSummary({ metrics }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.iconName] || Users;

        return (
          <div
            key={metric.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${metric.iconBgColor} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-5 h-5 ${metric.iconColor}`} />
              </div>
              <p className="text-caption font-medium text-gray-500 leading-tight">
                {metric.label}
              </p>
            </div>
            <div>
              <h2 className="text-stat font-bold text-slate-900 tabular-nums">
                {metric.value}
              </h2>
              <p className="text-micro mt-1 text-gray-500 uppercase tracking-wider">
                {metric.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
