import React from "react";

export function SecurityBanner() {
  return (
    <div className="bg-gradient-to-r from-violet-50/90 via-purple-50/60 to-indigo-50/90 border border-violet-100/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs overflow-hidden relative">
      {/* Left Info */}
      <div className="flex items-center gap-4 z-10">
        <div className="size-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/25">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Keep Your Account Secure
          </h4>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            We use OTP verification to ensure that only you can make changes to your account.
          </p>
        </div>
      </div>

      {/* Right 3D Security Graphic */}
      <div className="relative flex items-center justify-center shrink-0 self-center sm:self-auto z-10">
        <span className="absolute -top-1 -left-2 text-violet-400 text-xs animate-pulse">✦</span>
        <span className="absolute -bottom-1 -right-2 text-purple-400 text-xs animate-pulse">✦</span>

        <div className="relative flex items-center gap-2 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-2xl border border-violet-200/80 shadow-xs">
          <div className="size-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="10" x="5" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
              <span>Verified Account</span>
              <span className="text-emerald-500">✓</span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
              {"★★★★★"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
