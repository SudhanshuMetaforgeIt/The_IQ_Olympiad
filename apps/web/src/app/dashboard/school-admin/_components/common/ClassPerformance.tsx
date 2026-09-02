"use client";

import React, { useState } from "react";
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

// Class performance data dictionary for dynamic number updates
const performanceDataMap: Record<
  string,
  Record<string, { avgScore: string; passRate: string; studentCount: number }>
> = {
  "Class 7": {
    math: { avgScore: "89.2%", passRate: "95%", studentCount: 162 },
    science: { avgScore: "86.5%", passRate: "91%", studentCount: 162 },
    english: { avgScore: "82.0%", passRate: "88%", studentCount: 162 },
  },
  "Class 8": {
    math: { avgScore: "86.0%", passRate: "93%", studentCount: 175 },
    science: { avgScore: "83.4%", passRate: "90%", studentCount: 175 },
    english: { avgScore: "80.1%", passRate: "87%", studentCount: 175 },
  },
  "Class 9": {
    math: { avgScore: "82.4%", passRate: "90%", studentCount: 190 },
    science: { avgScore: "79.8%", passRate: "87%", studentCount: 190 },
    english: { avgScore: "76.5%", passRate: "84%", studentCount: 190 },
  },
  "Class 10": {
    math: { avgScore: "84.5%", passRate: "92%", studentCount: 184 },
    science: { avgScore: "81.2%", passRate: "89%", studentCount: 184 },
    english: { avgScore: "78.6%", passRate: "86%", studentCount: 184 },
  },
  "Class 11": {
    math: { avgScore: "88.0%", passRate: "94%", studentCount: 150 },
    science: { avgScore: "85.6%", passRate: "92%", studentCount: 150 },
    english: { avgScore: "83.1%", passRate: "89%", studentCount: 150 },
  },
  "Class 12": {
    math: { avgScore: "91.5%", passRate: "97%", studentCount: 142 },
    science: { avgScore: "88.9%", passRate: "94%", studentCount: 142 },
    english: { avgScore: "85.4%", passRate: "91%", studentCount: 142 },
  },
};

export function ClassPerformance({ metrics }: ClassPerformanceProps) {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClassChange = (val: string) => {
    setIsUpdating(true);
    setSelectedClass(val);
    setTimeout(() => setIsUpdating(false), 250);
  };

  const handleExamChange = (val: string) => {
    setIsUpdating(true);
    setSelectedExam(val);
    setTimeout(() => setIsUpdating(false), 250);
  };

  return (
    <div className="space-y-4">
      {/* Header with Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-h2 text-slate-900 font-extrabold">
          Class & Subject Performance
        </h2>
        <div className="flex items-center space-x-3">
          {/* Class Selector (Classes 7 to 12) */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-body-sm font-black text-slate-900 py-2 pl-4 pr-8 rounded-xl cursor-pointer hover:border-purple-300 focus:outline-none shadow-2xs"
            >
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>

          {/* Exam Selector */}
          <div className="relative">
            <select
              value={selectedExam}
              onChange={(e) => handleExamChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-body-sm font-black text-slate-900 py-2 pl-4 pr-8 rounded-xl cursor-pointer hover:border-purple-300 focus:outline-none shadow-2xs"
            >
              <option value="All Exams">All Exams</option>
              <option value="NSO">NSO Only</option>
              <option value="IMO">IMO Only</option>
              <option value="Cyber">Cyber Only</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 3 Subject Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metrics.map((subject) => {
          const Icon = iconMap[subject.iconName] || Sigma;
          const currentData =
            performanceDataMap[selectedClass]?.[subject.id] || {
              avgScore: subject.avgScore,
              passRate: subject.passRate,
              studentCount: subject.studentCount,
            };

          return (
            <div
              key={subject.id}
              className={`bg-white rounded-2xl p-5 border ${subject.borderColor} shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${subject.iconBgColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${subject.iconColor}`} />
                </div>
                <h3 className="text-h3 font-black text-slate-900">
                  {subject.name}
                </h3>
              </div>

              {/* Dynamic Number Grid with smooth transition */}
              <div className="grid grid-cols-3 gap-2 text-left pt-3 border-t border-slate-100">
                <div>
                  <p className="text-micro font-extrabold text-slate-500">Average Score</p>
                  <p
                    className={`text-h3 font-black text-purple-900 mt-1 tabular-nums transition-all duration-300 ${
                      isUpdating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                    }`}
                  >
                    {currentData.avgScore}
                  </p>
                </div>
                <div>
                  <p className="text-micro font-extrabold text-slate-500">Pass Rate</p>
                  <p
                    className={`text-h3 font-black text-purple-900 mt-1 tabular-nums transition-all duration-300 ${
                      isUpdating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                    }`}
                  >
                    {currentData.passRate}
                  </p>
                </div>
                <div>
                  <p className="text-micro font-extrabold text-slate-500">Students</p>
                  <p
                    className={`text-h3 font-black text-purple-900 mt-1 tabular-nums transition-all duration-300 ${
                      isUpdating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                    }`}
                  >
                    {currentData.studentCount}
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
