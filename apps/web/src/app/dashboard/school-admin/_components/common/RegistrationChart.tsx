"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RegistrationStatus } from "../../_types/dashboard";

interface RegistrationChartProps {
  data: RegistrationStatus;
}

export function RegistrationChart({ data }: RegistrationChartProps) {
  // SVG Donut Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const registeredOffset = 0;
  const registeredStroke = (data.registeredPercentage / 100) * circumference;

  const pendingOffset = registeredStroke;
  const pendingStroke = (data.pendingPercentage / 100) * circumference;

  const rejectedOffset = registeredStroke + pendingStroke;
  const rejectedStroke = (data.rejectedPercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 className="text-h2 text-slate-900 mb-6">
          Exam Registration Status
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2">
          {/* Donut Chart SVG */}
          <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
              {/* Background Track */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="20"
                fill="transparent"
              />
              {/* Registered Arc (Emerald Green) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-emerald-500 transition-all duration-1000"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray={`${registeredStroke} ${circumference}`}
                strokeDashoffset={-registeredOffset}
                strokeLinecap="round"
              />
              {/* Pending Arc (Amber) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-amber-500 transition-all duration-1000"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray={`${pendingStroke} ${circumference}`}
                strokeDashoffset={-pendingOffset}
                strokeLinecap="round"
              />
              {/* Rejected Arc (Red/Orange) */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-red-500 transition-all duration-1000"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray={`${rejectedStroke} ${circumference}`}
                strokeDashoffset={-rejectedOffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-stat font-bold text-slate-900 tabular-nums">
                {data.totalStudents.toLocaleString()}
              </span>
              <span className="text-micro text-gray-500 mt-0.5">
                Total Students
              </span>
            </div>
          </div>

          {/* Legend Details */}
          <div className="space-y-3.5 w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start space-x-4 text-body-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-regular text-slate-600">Registered</span>
              </div>
              <span className="font-bold text-slate-800 tabular-nums">
                {data.registeredCount.toLocaleString()} ({data.registeredPercentage}%)
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start space-x-4 text-body-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-regular text-slate-600">Pending</span>
              </div>
              <span className="font-bold text-slate-800 tabular-nums">
                {data.pendingCount} ({data.pendingPercentage}%)
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start space-x-4 text-body-sm">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="font-regular text-slate-600">Rejected</span>
              </div>
              <span className="font-bold text-slate-800 tabular-nums">
                {data.rejectedCount} ({data.rejectedPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-slate-100 mt-4">
        <Link
          href="/dashboard/school-admin"
          className="inline-flex items-center space-x-2 text-button font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          <span>View Full Report</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
