import React from "react";

export function PrivacyBanner() {
  return (
    <div className="bg-[#FAF8FF] border border-violet-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center gap-4 shadow-2xs">
      <div className="size-11 sm:size-12 rounded-2xl bg-violet-100/80 text-violet-700 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
          Your privacy and security are important to us.
        </h4>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
          We use secure and encrypted methods to protect your personal information.
        </p>
      </div>
    </div>
  );
}
