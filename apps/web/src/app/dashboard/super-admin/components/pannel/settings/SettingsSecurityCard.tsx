"use client";

import React, { useState } from "react";
import { Shield, Lock } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function SettingsSecurityCard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs font-sans transition-all">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-full bg-rose-100/70 text-rose-600 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Security
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Manage your account security preferences
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Row 1: Change Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">Change Password</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Update your account password
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-purple-200 text-purple-700 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-purple-50 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          </div>

          {/* Row 2: Two-Factor Authentication */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-3">
            <div>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">Two-Factor Authentication</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Add an extra layer of security
              </p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs font-semibold text-slate-500">
                {twoFactorEnabled ? "On" : "Off"}
              </span>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  twoFactorEnabled ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal Overlay Container (Disables background) */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
