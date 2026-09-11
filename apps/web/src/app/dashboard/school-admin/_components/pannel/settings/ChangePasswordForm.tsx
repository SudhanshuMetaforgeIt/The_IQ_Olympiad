"use client";

import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ShieldCheck, CheckCircle2, KeyRound } from "lucide-react";

interface ChangePasswordFormProps {
  onCancel: () => void;
  onSave?: () => void;
}

export function ChangePasswordForm({ onCancel, onSave }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!currentPassword) {
      setErrorMsg("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onSave?.();
      onCancel();
    }, 1200);
  };

  return (
    <div className="w-full font-sans text-slate-900 pb-12 animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
              title="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">Change Password</h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                Update your account password regularly to keep your account safe and secure.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="hidden sm:flex px-6 py-2.5 bg-[#6332ec] hover:bg-purple-800 text-white font-black text-sm rounded-full shadow-md shadow-purple-600/20 items-center space-x-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Update Password</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-bold">Password updated successfully! Returning to Settings...</p>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm font-bold">
            {errorMsg}
          </div>
        )}

        {/* Main Password Input Fields */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Password Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Password */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                Current Password <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                New Password <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                Confirm Password <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#6332ec] hover:bg-purple-800 text-white font-black text-sm rounded-full shadow-md shadow-purple-600/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
}
