"use client";

import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { UpcomingExam } from "../../_types/dashboard";

interface UpcomingExamsTableProps {
  exams: UpcomingExam[];
}

export function UpcomingExamsTable({ exams }: UpcomingExamsTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
      <h2 className="text-h2 text-slate-900">Upcoming Exams</h2>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-body border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-micro text-gray-500 uppercase">
              <th className="py-3 px-2">Exam Name</th>
              <th className="py-3 px-2">Exam Date</th>
              <th className="py-3 px-2">Duration</th>
              <th className="py-3 px-2">Registered / Capacity</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Registration Ends</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-regular text-slate-700">
            {exams.map((exam) => {
              const capacityPercent = Math.round(
                (exam.registeredCount / exam.capacityCount) * 100
              );

              return (
                <tr
                  key={exam.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3.5 px-2 font-bold text-purple-900 text-body">
                    {exam.name}
                  </td>
                  <td className="py-3.5 px-2 text-body text-slate-500">{exam.examDate}</td>
                  <td className="py-3.5 px-2 text-body text-slate-500">{exam.duration}</td>
                  <td className="py-3.5 px-2">
                    <div className="flex items-center space-x-3 max-w-xs">
                      <span className="font-bold text-slate-900 w-16 text-body tabular-nums">
                        {exam.registeredCount} / {exam.capacityCount}
                      </span>
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium ${
                        exam.status === "Open"
                          ? "bg-emerald-100/70 text-emerald-700"
                          : "bg-purple-100/70 text-purple-700"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-body text-slate-500">
                    {exam.registrationEndsDate}
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                      title="View Exam Details"
                    >
                      <Target className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-slate-100">
        <Link
          href="/dashboard/school-admin"
          className="inline-flex items-center space-x-2 text-button font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          <span>View All Exams</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
