"use client";

import React, { useState } from "react";
import { User, CheckCircle2, FileText, CheckSquare, ArrowRight, X, Clock, ShieldCheck, Download } from "lucide-react";
import { ActivityItem } from "../../_types/dashboard";

interface RecentActivityProps {
  activities: ActivityItem[];
}

const fullActivityLogs: ActivityItem[] = [
  { id: "act-1", title: "New student registered - Aarav Sharma (Class 10-A)", timestamp: "10 min ago", type: "student", iconBgColor: "bg-purple-100", iconColor: "text-[#6332ec]" },
  { id: "act-2", title: "Registration approved for National Science Olympiad (NSO)", timestamp: "35 min ago", type: "approval", iconBgColor: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: "act-3", title: "Mathematics Olympiad created for Class 8 to 12", timestamp: "1 hr ago", type: "creation", iconBgColor: "bg-purple-100", iconColor: "text-[#6332ec]" },
  { id: "act-4", title: "Results published for Science Pre-Test Assessment", timestamp: "2 hrs ago", type: "results", iconBgColor: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: "act-5", title: "Student profile updated - Priya Patel (Class 9-B)", timestamp: "3 hrs ago", type: "update", iconBgColor: "bg-purple-100", iconColor: "text-[#6332ec]" },
  { id: "act-6", title: "Bulk registration uploaded (45 students)", timestamp: "5 hrs ago", type: "student", iconBgColor: "bg-purple-100", iconColor: "text-[#6332ec]" },
  { id: "act-7", title: "Security password changed by Admin", timestamp: "1 day ago", type: "update", iconBgColor: "bg-amber-100", iconColor: "text-amber-600" },
  { id: "act-8", title: "English Olympiad Exam Schedule Updated", timestamp: "2 days ago", type: "creation", iconBgColor: "bg-purple-100", iconColor: "text-[#6332ec]" },
];

export function RecentActivity({ activities }: RecentActivityProps) {
  const [showModal, setShowModal] = useState(false);

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
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
        <div>
          <h2 className="text-h2 font-extrabold text-slate-900 mb-5">
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
                      className={`w-8 h-8 rounded-xl ${act.iconBgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-4 h-4 ${act.iconColor}`} />
                    </div>
                    <p className="text-sm text-slate-900 font-bold truncate">
                      {act.title}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Action Button (Opens On-Screen Modal without navigation) */}
        <div className="pt-4 border-t border-slate-100 mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-2 text-sm font-black text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
          >
            <span>View All Activity</span>
            <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* On-Screen Full Activity Modal Overlay (No Navigation) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Full Recent Activity Log
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Complete administrative & system activity audit stream.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Activity List Stream */}
            <div className="space-y-3">
              {fullActivityLogs.map((log) => {
                const Icon = getIcon(log.type);
                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-purple-200 transition bg-slate-50/50 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${log.iconBgColor} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4.5 h-4.5 ${log.iconColor}`} />
                      </div>
                      <p className="text-sm font-black text-slate-900 truncate">{log.title}</p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-600 shrink-0 bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                      {log.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-extrabold text-sm hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => alert("Activity audit log exported successfully!")}
                className="px-5 py-2.5 rounded-xl bg-[#6332ec] text-white font-extrabold text-sm flex items-center gap-2 hover:bg-purple-700 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit Log</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
