"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import StudentDashboard from "./components/pannel/Dashboard";
import MyExamsPanel from "./components/pannel/MyExams";
import OlympiadPanel from "./components/pannel/Olympiad";
import PracticePanel from "./components/pannel/Practice";
import ResultsPanel from "./components/pannel/Results";
import StudentProfilePanel from "./components/pannel/Profile";
import SettingsPanel from "./components/pannel/Settings";
import CertificatesPanel from "./components/pannel/Certificates";

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
        localStorage.removeItem("student_active_tab");
      }
      router.push("/login/student-login");
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

  // Restore saved tab from localStorage if URL has no tab param on initial load
  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (!urlTab && typeof window !== "undefined") {
      const savedTab = localStorage.getItem("student_active_tab");
      if (savedTab && savedTab !== "dashboard" && savedTab !== "logout") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", savedTab);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [searchParams, pathname, router]);

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
            initialFilterTab={currentSubTab as any}
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
            initialSubTab={currentSubTab as any}
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