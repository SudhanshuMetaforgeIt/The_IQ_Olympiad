"use client";

import React, { useState } from "react";

interface NotificationPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPreferencesModal({
  isOpen,
  onClose,
}: NotificationPreferencesModalProps) {
  const [examAlerts, setExamAlerts] = useState(true);
  const [resultsAlerts, setResultsAlerts] = useState(true);
  const [practiceReminders, setPracticeReminders] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Notification Preferences
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Choose how you receive updates and reminders
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          {[
            {
              id: "exam",
              title: "Upcoming Exam Reminders",
              desc: "Get notified 24 hours before your Olympiad exam starts.",
              state: examAlerts,
              setState: setExamAlerts,
            },
            {
              id: "results",
              title: "Results & Scorecard Releases",
              desc: "Instant notification when new test scores are published.",
              state: resultsAlerts,
              setState: setResultsAlerts,
            },
            {
              id: "practice",
              title: "Daily Practice Goal Tips",
              desc: "Friendly reminders to maintain your preparation streak.",
              state: practiceReminders,
              setState: setPracticeReminders,
            },
            {
              id: "whatsapp",
              title: "WhatsApp Alerts",
              desc: "Receive urgent exam hall links directly on your registered WhatsApp.",
              state: whatsappAlerts,
              setState: setWhatsappAlerts,
            },
            {
              id: "email",
              title: "Email Digests",
              desc: "Weekly summary reports sent to your registered email.",
              state: emailNotifications,
              setState: setEmailNotifications,
            },
          ].map((opt) => (
            <div
              key={opt.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 gap-3"
            >
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{opt.title}</h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">{opt.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => opt.setState(!opt.state)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  opt.state ? "bg-violet-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`size-4 rounded-full bg-white transition-transform transform ${
                    opt.state ? "translate-x-6" : "translate-x-1"
                  } absolute top-1`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
