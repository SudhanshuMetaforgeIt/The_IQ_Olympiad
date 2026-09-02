"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE } from "../Common/mockData";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import {
  HelpAndSupportModal,
  ChatbotPanel,
  NotificationPreferencesModal,
  TermsAndConditionsModal,
} from "./Settings/index";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export default function SettingsPanel({ activeTab = "settings", onSelectTab }: PanelProps) {
  const [activeView, setActiveView] = useState<"settings" | "chatbot">("settings");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
    showToast(`Theme changed to ${e.target.value}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    showToast(`Language set to ${e.target.value}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Fixed Left Sidebar (always stable & visible) */}
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Right Side Area */}
      {activeView === "chatbot" ? (
        /* Right-Side Chatbot Panel occupying the entire right canvas */
        <ChatbotPanel
          onBack={() => setActiveView("settings")}
          whatsappNumber="+919876543210"
        />
      ) : (
        /* Standard Settings Canvas */
        <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
          <HeaderBar student={STUDENT_PROFILE} onSelectTab={onSelectTab} />

          <main className="flex-1 p-4 md:p-8 space-y-6">
            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-3 animate-fade-in">
                <span className="text-emerald-400 text-base">✓</span>
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Page Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Settings
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Manage your account preferences and app settings.
              </p>
            </div>

            {/* Settings List Container */}
            <div className="space-y-4">
              {/* 0. Terms and Conditions (Placed directly above Profile & Account) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Terms and Conditions
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Read and understand the terms and conditions for using our platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsTermsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
                  >
                    <span>View Terms</span>
                    <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </button>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 1. Profile & Account */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Profile & Account
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Update your personal information and account details.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onSelectTab?.("profile")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 2. Notification Preferences */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Notification Preferences
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Choose how you want to receive updates and alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsNotificationModalOpen(true)}
                    className="px-5 py-2 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
                  >
                    Manage
                  </button>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 3. Privacy & Security */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Privacy & Security
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Manage your password and security preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onSelectTab?.("profile")}
                    className="px-5 py-2 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
                  >
                    Manage
                  </button>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 4. Appearance */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Appearance
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Customize the look and feel of the platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-bold text-slate-500">Theme</span>
                  <div className="relative">
                    <select
                      value={selectedTheme}
                      onChange={handleThemeChange}
                      className="pl-8 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white appearance-none cursor-pointer transition shadow-2xs"
                    >
                      <option value="Light">Light</option>
                      <option value="Dark">Dark</option>
                    </select>
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 5. Language & Region */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Language & Region
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Select your language and regional preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-bold text-slate-500">Language</span>
                  <div className="relative">
                    <select
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="px-4 pr-8 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-violet-500 focus:bg-white appearance-none cursor-pointer transition shadow-2xs"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>

              {/* 6. Help & Support */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" x2="12.01" y1="17" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Help & Support
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Get help, contact support or view FAQs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsHelpModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    <span>Open Support</span>
                  </button>
                  <span className="text-slate-300 font-bold text-lg hidden sm:inline">›</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Terms and Conditions Modal Popup */}
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Help & Support Modal Popup */}
      <HelpAndSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onStartBotChat={() => {
          setIsHelpModalOpen(false);
          setActiveView("chatbot");
        }}
        whatsappNumber="+919876543210"
      />

      {/* Notification Preferences Modal Popup */}
      <NotificationPreferencesModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </div>
  );
}
