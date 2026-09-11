import React from "react";

export function PracticeUnlimitedBanner() {
  return (
    <div className="bg-[#FAF8FF] border border-violet-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs shrink-0">
      {/* Left: Crown / Medal Badge + Text */}
      <div className="flex items-center gap-3.5">
        <div className="size-11 sm:size-12 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-violet-500/20">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
            Unlock Unlimited Practice!
          </h4>
          <p className="text-xs font-semibold text-slate-500">
            Test 11 and above in each subject are available with a subscription.
          </p>
        </div>
      </div>

      {/* Right: 11th Test Onwards Badge + View Subscription Plans Button */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-100/70 border border-violet-200 text-violet-700 font-extrabold text-xs">
          <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>11th Test Onwards</span>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-white border-2 border-violet-300 text-violet-700 font-black text-xs sm:text-sm hover:bg-violet-50 transition-all cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
          <span>View Subscription Plans</span>
        </button>
      </div>
    </div>
  );
}
