"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldOff, Smartphone, Lock, X, CheckCircle2 } from "lucide-react";

interface TwoFactorModalProps {
  isOpen: boolean;
  is2FAEnabled: boolean;
  onClose: () => void;
  onToggle2FA: (enabled: boolean) => void;
}

export function TwoFactorModal({
  isOpen,
  is2FAEnabled,
  onClose,
  onToggle2FA,
}: TwoFactorModalProps) {
  const [isEnabled, setIsEnabled] = useState(is2FAEnabled);
  const [method, setMethod] = useState<"app" | "sms">("app");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleToggle = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    onToggle2FA(nextState);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 border-b border-slate-100 pb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isEnabled ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}>
            {isEnabled ? <ShieldCheck className="w-6 h-6" /> : <ShieldOff className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Two-Factor Auth</h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md ${
                isEnabled ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                {isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-xs font-bold">2FA settings saved ({isEnabled ? "Enabled" : "Disabled"})</p>
          </div>
        )}

        {/* Enable / Disable Toggle Switch Bar */}
        <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Require 2FA Code</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {isEnabled ? "Protection active on login." : "Enable extra account security."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors cursor-pointer ${
              isEnabled ? "bg-[#6332ec]" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                isEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* 2FA Method Selector (If Enabled) */}
        {isEnabled && (
          <div className="space-y-3 pt-1">
            <label className="block text-xs font-extrabold text-slate-800">Verification Method</label>
            
            <div
              onClick={() => setMethod("app")}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                method === "app" ? "border-[#6332ec] bg-purple-50/40" : "border-slate-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-[#6332ec]" />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Authenticator App (Recommended)</p>
                  <p className="text-[11px] font-semibold text-slate-500">Google Authenticator or Authy</p>
                </div>
              </div>
              <input type="radio" checked={method === "app"} onChange={() => setMethod("app")} className="text-[#6332ec]" />
            </div>

            <div
              onClick={() => setMethod("sms")}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                method === "sms" ? "border-[#6332ec] bg-purple-50/40" : "border-slate-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="w-4 h-4 text-[#6332ec]" />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">SMS Verification Code</p>
                  <p className="text-[11px] font-semibold text-slate-500">Sent to +91 98765 43210</p>
                </div>
              </div>
              <input type="radio" checked={method === "sms"} onChange={() => setMethod("sms")} className="text-[#6332ec]" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#6332ec] hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md shadow-purple-600/20 transition-all cursor-pointer w-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
