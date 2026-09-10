"use client";

import React, { useState } from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsLogoutCard() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push("/");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Log Out
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Safely end your current admin session and sign out of the system
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Confirm Log Out</h4>
                <p className="text-xs text-slate-500 font-medium">Are you sure you want to sign out?</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              You will need to enter your credentials again to access the Super Admin Dashboard.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
