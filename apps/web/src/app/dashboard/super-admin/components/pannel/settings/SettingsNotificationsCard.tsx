"use client";

import React, { useState } from "react";
import { Bell, Edit3, Check, X, CheckCircle2, ChevronDown } from "lucide-react";

export interface NotificationsConfig {
  examReminders: boolean;
  resultPublished: boolean;
  certificateIssued: boolean;
  systemAlerts: boolean;
  reminderLeadTime: string;
  emailDigest: string;
}

export default function SettingsNotificationsCard() {
  const [config, setConfig] = useState<NotificationsConfig>({
    examReminders: true,
    resultPublished: true,
    certificateIssued: true,
    systemAlerts: true,
    reminderLeadTime: "24 Hours Prior",
    emailDigest: "Daily Summary",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<NotificationsConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const startEditing = () => {
    setDraft({ ...config });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const cancelEditing = () => {
    setDraft({ ...config });
    setIsEditing(false);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setConfig(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 600);
  };

  const toggleNotification = (key: "examReminders" | "resultPublished" | "certificateIssued" | "systemAlerts") => {
    if (isEditing) {
      setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const activeData = isEditing ? draft : config;

  const notificationItems = [
    {
      id: "examReminders" as const,
      title: "Exam Reminders",
      description: `Send reminders before exam (${activeData.reminderLeadTime})`,
    },
    {
      id: "resultPublished" as const,
      title: "Result Published",
      description: "Notify when results are published",
    },
    {
      id: "certificateIssued" as const,
      title: "Certificate Issued",
      description: "Notify when certificates are issued",
    },
    {
      id: "systemAlerts" as const,
      title: "System Alerts",
      description: "Important system updates",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3.5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Notifications
                </h3>
                {isEditing && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wide">
                    Editing
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {isEditing ? "Configure notification preferences below" : "Manage system notifications"}
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={cancelEditing}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              title="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notification list (toggleable anytime) */}
        <div className="space-y-3">
          {notificationItems.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center justify-between py-1.5 text-xs sm:text-sm ${
                idx !== notificationItems.length - 1 ? "border-b border-slate-100 pb-3" : "pb-1"
              }`}
            >
              <div>
                <p className="font-bold text-slate-900 leading-snug">{item.title}</p>
                <p className="text-xs font-medium text-slate-500">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification(item.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  activeData[item.id] ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    activeData[item.id] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}

          {/* Advanced options revealed during inline editing */}
          {isEditing && (
            <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="text-xs font-bold text-slate-700">Reminder Timing</label>
                <div className="relative sm:w-44">
                  <select
                    value={draft.reminderLeadTime}
                    onChange={(e) => setDraft({ ...draft, reminderLeadTime: e.target.value })}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="1 Hour Prior">1 Hour Prior</option>
                    <option value="24 Hours Prior">24 Hours Prior</option>
                    <option value="48 Hours Prior">48 Hours Prior</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="text-xs font-bold text-slate-700">Email Digest</label>
                <div className="relative sm:w-44">
                  <select
                    value={draft.emailDigest}
                    onChange={(e) => setDraft({ ...draft, emailDigest: e.target.value })}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="Daily Summary">Daily Summary</option>
                    <option value="Weekly Summary">Weekly Summary</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-6 flex justify-center">
        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="px-5 py-2.5 rounded-xl border border-purple-200 text-purple-700 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Notification Settings</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full justify-end">
            <button
              type="button"
              onClick={cancelEditing}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saveSuccess}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
