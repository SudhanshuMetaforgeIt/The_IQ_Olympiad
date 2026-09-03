"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { clearAccessToken } from "@/lib/auth/token-storage";
import StudentDashboard from "./components/pannel/Dashboard";
import MyExamsPanel from "./components/pannel/MyExams";
import OlympiadPanel from "./components/pannel/Olympiad";
import PracticePanel from "./components/pannel/Practice";
import ResultsPanel from "./components/pannel/Results";
import StudentProfilePanel from "./components/pannel/Profile";
import SettingsPanel from "./components/pannel/Settings";
import CertificatesPanel from "./components/pannel/Certificates";
import type { FilterTab } from "./components/pannel/Olympiad/types";

type CertificateSubTab = "certificates" | "badges" | "coupons";

function isFilterTab(value: string): value is FilterTab {
  return (
    value === "all" ||
    value === "registered" ||
    value === "upcoming" ||
    value === "ongoing" ||
    value === "completed"
  );
}

function isCertificateSubTab(value: string): value is CertificateSubTab {
  return value === "certificates" || value === "badges" || value === "coupons";
}

function StudentDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read active tab and optional subtab from URL query param
  const activeTab = searchParams.get("tab") || "dashboard";
  const rawSubTab = searchParams.get("subtab");

  // Tab-specific default subtabs
  const getSubTabForTab = (tab: string): string => {
    if (rawSubTab) return rawSubTab;
    switch (tab) {
      case "exams":
        return "upcoming";
      case "olympiad":
        return "all";
      case "certificates":
        return "certificates";
      case "results":
        return "olympiad";
      case "practice":
        return "all";
      default:
        return "";
    }
  };

  const currentSubTab = getSubTabForTab(activeTab);

  // Handle tab & optional subtab selection
  const handleSelectTab = (tabId: string, subtabId?: string) => {
    if (tabId === "logout") {
      if (typeof window !== "undefined") {
        clearAccessToken();
        localStorage.removeItem("student_active_tab");
        router.push("/");
      }
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("student_active_tab", tabId);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    if (subtabId) {
      params.set("subtab", subtabId);
    } else {
      params.delete("subtab");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const olympiadFilterTab: FilterTab = isFilterTab(currentSubTab)
    ? currentSubTab
    : "all";
  const certificateSubTab: CertificateSubTab = isCertificateSubTab(currentSubTab)
    ? currentSubTab
    : "certificates";

  const renderPanel = () => {
    switch (activeTab) {
      case "exams":
        return (
          <MyExamsPanel
            activeTab={activeTab}
            initialSubtab={currentSubTab as "upcoming" | "completed"}
            onSelectTab={handleSelectTab}
          />
        );
      case "olympiad":
        return (
          <OlympiadPanel
            activeTab={activeTab}
            initialFilterTab={olympiadFilterTab}
            onSelectTab={handleSelectTab}
          />
        );
      case "practice":
        return <PracticePanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "results":
        return <ResultsPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "certificates":
        return (
          <CertificatesPanel
            activeTab={activeTab}
            initialSubTab={certificateSubTab}
            onSelectTab={handleSelectTab}
          />
        );
      case "profile":
        return <StudentProfilePanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "settings":
        return <SettingsPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      default:
        return <StudentDashboard activeTab={activeTab} onSelectTab={handleSelectTab} />;
    }
  };

  return renderPanel();
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-bold">Loading...</div>}>
      <StudentDashboardContent />
    </Suspense>
  );
}
