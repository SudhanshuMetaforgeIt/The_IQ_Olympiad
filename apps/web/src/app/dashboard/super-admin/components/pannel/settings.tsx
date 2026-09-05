"use client";

import React, { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function SettingsPanel() {
  const [platformName, setPlatformName] = useState("THE IQ OLYMPIAD");
  const [supportEmail, setSupportEmail] = useState("support@examiq.com");

  return (
    <div className="space-y-6 pb-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            Platform Settings
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Global system configurations, security controls, and admin preferences
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[#3B1EAE] uppercase tracking-wider">
            General Configuration
          </h3>
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              Official Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

