"use client";

import Link from "next/link";
import { User, CheckCircle2, FileText, CheckSquare, ArrowRight } from "lucide-react";
import { ActivityItem } from "../../_types/dashboard";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "student":
      case "update":
        return User;
      case "approval":
        return CheckCircle2;
      case "creation":
        return FileText;
      case "results":
        return CheckSquare;
      default:
        return User;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 className="text-h2 text-slate-900 mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.map((act) => {
            const Icon = getIcon(act.type);

            return (
              <div
                key={act.id}
                className="flex items-center justify-between space-x-3 text-body"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg ${act.iconBgColor} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${act.iconColor}`} />
                  </div>
                  <p className="text-body text-slate-800 font-medium truncate">
                    {act.title}
                  </p>
                </div>
                <span className="text-caption text-gray-500 font-medium shrink-0">
                  {act.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-slate-100 mt-4">
        <Link
          href="/dashboard/school-admin"
          className="inline-flex items-center space-x-2 text-button font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          <span>View All Activity</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
