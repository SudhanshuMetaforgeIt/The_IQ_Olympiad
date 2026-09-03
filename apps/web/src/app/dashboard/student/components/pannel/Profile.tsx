"use client";

import React, { useState, useSyncExternalStore } from "react";
import { STUDENT_PROFILE } from "../Common/mockData";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
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

function subscribeToStudentProfileStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("student_profile_updated", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("student_profile_updated", onStoreChange);
  };
}

function getStudentProfileStoreSnapshot(): string {
  if (typeof window === "undefined") {
    return "|";
  }
  const fullName = localStorage.getItem("student_custom_name") ?? "";
  const avatarUrl = localStorage.getItem("student_custom_avatar") ?? "";
  return `${fullName}|${avatarUrl}`;
}

function getStudentProfileServerSnapshot(): string {
  return "|";
}

function parseStoredProfileSnapshot(snapshot: string): Pick<StudentProfileData, "fullName" | "avatarUrl"> {
  const separatorIndex = snapshot.indexOf("|");
  const fullName = separatorIndex >= 0 ? snapshot.slice(0, separatorIndex) : "";
  const avatarUrl = separatorIndex >= 0 ? snapshot.slice(separatorIndex + 1) : "";
  return {
    fullName,
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

export default function StudentProfilePanel({
  activeTab = "profile",
  onSelectTab,
}: PanelProps) {
  const storedSnapshot = useSyncExternalStore(
    subscribeToStudentProfileStore,
    getStudentProfileStoreSnapshot,
    getStudentProfileServerSnapshot
  );
  const storedProfile = parseStoredProfileSnapshot(storedSnapshot);
  const [profileData, setProfileData] = useState<StudentProfileData>(INITIAL_STUDENT_PROFILE);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mergedProfile: StudentProfileData = {
    ...profileData,
    fullName: storedProfile.fullName || profileData.fullName,
    ...(storedProfile.avatarUrl || profileData.avatarUrl
      ? { avatarUrl: storedProfile.avatarUrl || profileData.avatarUrl }
      : {}),
  };

  const handleFieldChange = (field: keyof StudentProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveField = () => {
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

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
              <span className="text-emerald-400 text-base">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Top Title Bar */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Profile Information
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              View and manage your personal, academic, and identity information.
            </p>
          </div>

          {/* Top Row: 2 Columns (Personal Information & Academic Information) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* 1. Personal Information */}
            <PersonalInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
              onSave={handleSaveField}
            />

            {/* 2. Academic Information */}
            <AcademicInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
            />
          </div>

          {/* Bottom Row: 3 Columns (Identity Information, Security, Activity Summary) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {/* 3. Identity Information */}
            <IdentityInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
            />

            {/* 4. Security */}
            <SecurityCard
              email={mergedProfile.email}
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
        phone={mergedProfile.phone}
      />
    </div>
  );
}
