"use client";

import React from "react";
import Link from "next/link";
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

const routeMap: Record<string, string> = {
  "total-students": "/dashboard/school-admin/students",
  "registered-students": "/dashboard/school-admin/exam-registration",
  "pending-registrations": "/dashboard/school-admin/exam-registration?status=pending",
  "upcoming-exams": "/dashboard/school-admin/exams?tab=upcoming",
  "exams-completed": "/dashboard/school-admin/exams?tab=completed",
};

export function StatsSummary({ metrics }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.iconName] || Users;

        let targetHref = routeMap[metric.id];
        if (!targetHref) {
          if (metric.label.toLowerCase().includes("total student")) {
            targetHref = "/dashboard/school-admin/students";
          } else if (metric.label.toLowerCase().includes("pending")) {
            targetHref = "/dashboard/school-admin/exam-registration?status=pending";
          } else if (metric.label.toLowerCase().includes("upcoming")) {
            targetHref = "/dashboard/school-admin/exams?tab=upcoming";
          } else if (metric.label.toLowerCase().includes("completed")) {
            targetHref = "/dashboard/school-admin/exams?tab=completed";
          } else if (metric.label.toLowerCase().includes("register")) {
            targetHref = "/dashboard/school-admin/exam-registration";
          } else if (metric.label.toLowerCase().includes("exam")) {
            targetHref = "/dashboard/school-admin/exams";
          }
        }

        const cardElement = (
          <div
            className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm transition-all duration-200 flex flex-col justify-between h-full ${
              targetHref
                ? "cursor-pointer hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5 group"
                : ""
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${metric.iconBgColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                <Icon className={`w-5 h-5 ${metric.iconColor}`} />
              </div>
              <p className="text-caption font-extrabold text-slate-700 leading-tight group-hover:text-purple-700 transition-colors">
                {metric.label}
              </p>
            </div>
            <div>
              <h2 className="text-stat font-black text-slate-900 tabular-nums">
                {metric.value}
              </h2>
              <p className="text-micro mt-1 text-slate-500 uppercase tracking-wider font-bold">
                {metric.subtitle}
              </p>
            </div>
          </div>
        );

        if (targetHref) {
          return (
            <Link key={metric.id} href={targetHref} className="block h-full">
              {cardElement}
            </Link>
          );
        }

        return <div key={metric.id} className="h-full">{cardElement}</div>;
      })}
    </div>
  );
}
