"use client";

import React, { useState, useSyncExternalStore } from "react";
import { StudentPanelChrome } from "../Common/StudentPanelChrome";
import { Sidebar } from "../Common/Sidebar";
import { HeaderBar } from "../Common/HeaderBar";
import { useStudentMe } from "../../StudentMeProvider";
import type { StudentProfile } from "../../types";
import {
  PersonalInformationCard,
  AcademicInformationCard,
  IdentityInformationCard,
  SecurityCard,
  ActivitySummaryCard,
  PrivacyBanner,
  ChangePasswordModal,
  CompleteProfileCard,
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

function parseStoredProfileSnapshot(
  snapshot: string
): Pick<StudentProfileData, "fullName" | "avatarUrl"> {
  const separatorIndex = snapshot.indexOf("|");
  const fullName = separatorIndex >= 0 ? snapshot.slice(0, separatorIndex) : "";
  const avatarUrl = separatorIndex >= 0 ? snapshot.slice(separatorIndex + 1) : "";
  return {
    fullName,
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

function ProfilePanelBody({
  activeTab,
  onSelectTab,
  student,
}: {
  activeTab: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
  student: StudentProfile;
}) {
  const { profileForm, refetch } = useStudentMe();
  const storedSnapshot = useSyncExternalStore(
    subscribeToStudentProfileStore,
    getStudentProfileStoreSnapshot,
    getStudentProfileServerSnapshot
  );
  const storedProfile = parseStoredProfileSnapshot(storedSnapshot);
  const [overrides, setOverrides] = useState<Partial<StudentProfileData>>({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fallbackProfile: StudentProfileData = {
    fullName:
      student.name === "Harshith Bantu" || !student.name || student.name === "Student"
        ? "Haripriya varma"
        : student.name,
    className: student.grade || "Class 10",
    email: "student@example.com",
    phone: "+91",
    schoolName: student.school || "School",
    academicYear: "2026-27",
    section: "A",
    rollNumber: "Not assigned",
    studentId: "IQO-STU-001",
    dateOfBirth: "Not provided",
    gender: "Not specified",
    country: "India",
    aadharNumber: "",
    isAadharVerified: false,
  };

  const profileData: StudentProfileData = {
    ...(profileForm || fallbackProfile),
    ...overrides,
  };

  const mergedProfile: StudentProfileData = {
    ...profileData,
    fullName: storedProfile.fullName || profileData.fullName,
    ...(profileData.avatarUrl || storedProfile.avatarUrl
      ? { avatarUrl: profileData.avatarUrl || storedProfile.avatarUrl }
      : {}),
  };

  const handleFieldChange = (field: keyof StudentProfileData, value: string) => {
    setOverrides((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveField = (fieldLabel?: string) => {
    setToastMessage(fieldLabel || "Saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleChangeEmail = () => {
    setToastMessage(
      "Please contact the school admin to update your registered email address."
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar student={student} activeTab={activeTab} onSelectTab={onSelectTab} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        <HeaderBar student={student} onSelectTab={onSelectTab} />

        <main className="flex-1 p-4 md:p-6 space-y-4 sm:space-y-5">
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
              <span className="text-emerald-400 text-base">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Profile Information
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              View and manage your personal, academic, and identity information.
            </p>
          </div>

          <CompleteProfileCard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            <PersonalInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
              onSave={handleSaveField}
              onPhotoUploaded={refetch}
            />

            <AcademicInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            <IdentityInformationCard
              profile={mergedProfile}
              onChange={handleFieldChange}
            />

            <SecurityCard
              email={mergedProfile.email}
              onChangePassword={() => setIsPasswordModalOpen(true)}
              onChangeEmail={handleChangeEmail}
            />

            <ActivitySummaryCard
              onViewDetailedAnalytics={() => onSelectTab?.("results")}
            />
          </div>

          <PrivacyBanner />
        </main>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        phone={mergedProfile.phone}
      />
    </div>
  );
}

export default function StudentProfilePanel({
  activeTab = "profile",
  onSelectTab,
}: PanelProps) {
  return (
    <StudentPanelChrome activeTab={activeTab} onSelectTab={onSelectTab}>
      {({ student, activeTab, onSelectTab }) => (
        <ProfilePanelBody
          student={student}
          activeTab={activeTab}
          onSelectTab={onSelectTab}
        />
      )}
    </StudentPanelChrome>
  );
}
