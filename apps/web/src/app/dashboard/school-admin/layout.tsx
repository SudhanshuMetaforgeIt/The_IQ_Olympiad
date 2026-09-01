"use client";

import { useState, ReactNode } from "react";
import { Sidebar } from "./_components/common/Sidebar";
import { Header } from "./_components/common/Header";
import { mockSchoolProfile } from "./_data/mockData";

export default function SchoolAdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Right Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          profile={mockSchoolProfile}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Dynamic Page Children Container */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          aria-hidden="true"
        />
      )}
    </div>
  );
}