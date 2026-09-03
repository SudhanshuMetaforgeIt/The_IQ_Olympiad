"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useStudentMe } from "../../StudentMeProvider";
import type { StudentProfile } from "../../types";

type StudentPanelChromeProps = {
  activeTab?: string;
  onSelectTab?: (tabId: string, subtabId?: string) => void;
  children: (args: {
    student: StudentProfile;
    onSelectTab?: (tabId: string, subtabId?: string) => void;
    activeTab: string;
  }) => React.ReactNode;
};

function FullScreenMessage({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm space-y-3">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
        <p className="text-sm font-medium text-slate-500">{message}</p>
        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition cursor-pointer"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Shared gate for student panels: one /students/me fetch via context,
 * loading/error/missing-profile handling, then render with real shell identity.
 */
export function StudentPanelChrome({
  activeTab = "dashboard",
  onSelectTab,
  children,
}: StudentPanelChromeProps) {
  const router = useRouter();
  const { status, errorMessage, shell, refetch } = useStudentMe();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm font-bold text-slate-500">Loading your profile…</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <FullScreenMessage
        title="Sign in required"
        message={errorMessage || "Please sign in with your student account to open the dashboard."}
        actionLabel="Go to login"
        onAction={() => {
          router.push("/login?role=student");
        }}
      />
    );
  }

  if (status === "missing_profile") {
    return (
      <FullScreenMessage
        title="Profile not ready"
        message={
          errorMessage ||
          "Your student profile has not been created yet. Complete student registration or contact your school admin."
        }
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  if (status === "error" || !shell) {
    return (
      <FullScreenMessage
        title="Unable to load profile"
        message={errorMessage || "Something went wrong while loading your student profile."}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return <>{children({ student: shell, onSelectTab, activeTab })}</>;
}
