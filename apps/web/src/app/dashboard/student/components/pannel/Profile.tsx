"use client";

import React, { useState } from "react";
import { STUDENT_PROFILE } from "../Commonn/mockData";
import { Sidebar } from "../Commonn/Sidebar";
import { HeaderBar } from "../Commonn/HeaderBar";
import {
  INITIAL_STUDENT_PROFILE,
  PersonalInformationCard,
  AcademicInformationCard,
  IdentityInformationCard,
  SecurityCard,
  ActivitySummaryCard,
  PrivacyBanner,
  ChangePasswordModal,
  type StudentProfileData,
} from "./Profile/index";

interface PanelProps {
  activeTab?: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
}

export default function StudentProfilePanel({
  activeTab = "profile",
  onSelectTab,
}: PanelProps) {
  const [profileData, setProfileData] = useState<StudentProfileData>(INITIAL_STUDENT_PROFILE);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFieldChange = (field: keyof StudentProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveField = (fieldLabel: string) => {
    setToastMessage("Saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleChangeEmail = () => {
    setToastMessage("Please contact the school admin to update your registered email address.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar student={STUDENT_PROFILE} activeTab={activeTab} onSelectTab={onSelectTab} />

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

          {/* Top Title Bar */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Profile Information
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              View and manage your personal, academic, and identity information.
            </p>
          </div>

          {/* Top Row: 2 Columns (Personal Information & Academic Information) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* 1. Personal Information */}
            <PersonalInformationCard
              profile={profileData}
              onChange={handleFieldChange}
            />

            {/* 2. Academic Information */}
            <AcademicInformationCard
              profile={profileData}
              onChange={handleFieldChange}
            />
          </div>

          {/* Bottom Row: 3 Columns (Identity Information, Security, Activity Summary) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* 3. Identity Information */}
            <IdentityInformationCard
              profile={profileData}
              onChange={handleFieldChange}
            />

            {/* 4. Security */}
            <SecurityCard
              email={profileData.email}
              onChangePassword={() => setIsPasswordModalOpen(true)}
              onChangeEmail={handleChangeEmail}
            />

            {/* 5. Activity Summary */}
            <ActivitySummaryCard
              onViewDetailedAnalytics={() => onSelectTab?.("results")}
            />
          </div>

          {/* Bottom Banner: Privacy & Security */}
          <PrivacyBanner />
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        phone={profileData.phone}
      />
    </div>
  );
}
