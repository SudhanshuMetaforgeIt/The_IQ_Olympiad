import React from "react";
import { STUDENT_PROFILE } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export default function SettingsPanel({ activeTab = "settings", onSelectTab }: PanelProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar student={STUDENT_PROFILE} />
        <main className="flex-1 p-6 md:p-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
            <p className="text-sm text-slate-500 mt-1">
              Configure notification preferences, security options, and account details.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
