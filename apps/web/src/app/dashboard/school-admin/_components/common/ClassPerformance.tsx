"use client";

import { useState } from "react";
import { Sigma, FlaskConical, BookOpen, ChevronDown } from "lucide-react";
import { SubjectMetric } from "../../_types/dashboard";

interface ClassPerformanceProps {
  metrics: SubjectMetric[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sigma: Sigma,
  flask: FlaskConical,
  book: BookOpen,
};

export function ClassPerformance({ metrics }: ClassPerformanceProps) {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedExam, setSelectedExam] = useState("All Exams");

  return (
    <div className="space-y-4">
      {/* Header with Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-h2 text-slate-900">
          Class & Subject Performance
        </h2>
        <div className="flex items-center space-x-3">
          {/* Class Selector */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-body-sm font-medium text-slate-700 py-1.5 pl-3 pr-7 rounded-xl cursor-pointer hover:border-slate-300 focus:outline-none"
            >
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 8">Class 8</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Exam Selector */}
          <div className="relative">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-body-sm font-medium text-slate-700 py-1.5 pl-3 pr-7 rounded-xl cursor-pointer hover:border-slate-300 focus:outline-none"
            >
              <option value="All Exams">All Exams</option>
              <option value="NSO">NSO Only</option>
              <option value="IMO">IMO Only</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3 Subject Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metrics.map((subject) => {
          const Icon = iconMap[subject.iconName] || Sigma;

          return (
            <div
              key={subject.id}
              className={`bg-white rounded-2xl p-5 border ${subject.borderColor} shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${subject.iconBgColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${subject.iconColor}`} />
                </div>
                <h3 className="text-h3 text-slate-900">
                  {subject.name}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 text-left pt-3 border-t border-slate-100">
                <div>
                  <p className="text-micro text-gray-500">
                    Average Score
                  </p>
                  <p className="text-h3 font-bold text-purple-900 mt-1 tabular-nums">
                    {subject.avgScore}
                  </p>
                </div>
                <div>
                  <p className="text-micro text-gray-500">
                    Pass Rate
                  </p>
                  <p className="text-h3 font-bold text-purple-900 mt-1 tabular-nums">
                    {subject.passRate}
                  </p>
                </div>
                <div>
                  <p className="text-micro text-gray-500">
                    Students
                  </p>
                  <p className="text-h3 font-bold text-purple-900 mt-1 tabular-nums">
                    {subject.studentCount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
