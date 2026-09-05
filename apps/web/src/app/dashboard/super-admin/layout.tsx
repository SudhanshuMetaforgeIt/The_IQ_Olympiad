"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/common/Sidebar";
import { Header } from "./components/common/Header";
import SuperAdminDashboard from "./components/pannel/dashboard";
import SchoolsPanel from "./components/pannel/schools";
import StudentsPanel from "./components/pannel/students";
import OlympiadsPanel from "./components/pannel/olympiads";
import ResultsPanel from "./components/pannel/results";
import CertificatesPanel from "./components/pannel/certificates";
import ReportsPanel from "./components/pannel/reports";
import SettingsPanel from "./components/pannel/settings";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return typeof SuperAdminDashboard === "function" ? <SuperAdminDashboard onSelectTab={setActiveTab} /> : null;
      case "schools":
        return typeof SchoolsPanel === "function" ? <SchoolsPanel /> : null;
      case "students":
        return typeof StudentsPanel === "function" ? <StudentsPanel /> : null;
      case "olympiads":
        return typeof OlympiadsPanel === "function" ? <OlympiadsPanel /> : null;
      case "results":
        return typeof ResultsPanel === "function" ? <ResultsPanel /> : null;
      case "certificates":
        return typeof CertificatesPanel === "function" ? <CertificatesPanel /> : null;
      case "reports":
        return typeof ReportsPanel === "function" ? <ReportsPanel /> : null;
      case "settings":
        return typeof SettingsPanel === "function" ? <SettingsPanel /> : null;
      default:
        return typeof SuperAdminDashboard === "function" ? <SuperAdminDashboard onSelectTab={setActiveTab} /> : null;
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Right Shell */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header activeTab={activeTab} />

        {/* Dynamic Panel Content Canvas */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto w-full">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}