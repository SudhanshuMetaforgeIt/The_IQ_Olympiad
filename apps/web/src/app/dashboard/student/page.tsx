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

  // Read the active tab directly from URL query param (?tab=...)
  const activeTab = searchParams.get("tab") || "dashboard";

  // Handle tab selection: update URL history so browser back/forward and refresh work seamlessly
  const handleSelectTab = (tabId: string) => {
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
    router.push(`${pathname}?${params.toString()}`);
  };

  // Restore saved tab from localStorage if URL has no tab param on initial direct load
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
        return <MyExamsPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "olympiad":
        return <OlympiadPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "practice":
        return <PracticePanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "results":
        return <ResultsPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
      case "certificates":
        return <CertificatesPanel activeTab={activeTab} onSelectTab={handleSelectTab} />;
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