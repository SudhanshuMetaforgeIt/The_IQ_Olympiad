"use client";

import React, { useEffect } from "react";
import { LogOut } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 sm:p-9 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200 border border-slate-100"
      >
        {/* Top Red Circle Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-red-50 border-8 border-red-50/60 text-red-500 flex items-center justify-center mb-5 shrink-0 shadow-inner">
          <LogOut className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Confirm Logout
        </h3>

        {/* Subtitle Message */}
        <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed max-w-xs">
          Are you sure you want to logout? You will need to login again to access your account.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-7">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-red-500/20"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
