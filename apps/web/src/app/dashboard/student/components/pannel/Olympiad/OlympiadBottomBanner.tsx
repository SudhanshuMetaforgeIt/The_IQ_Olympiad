import React from "react";

export function OlympiadBottomBanner() {
  return (
    <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
      <div className="size-6 rounded-full bg-violet-600 text-white flex items-center justify-center font-black text-xs shrink-0">
        i
      </div>
      <p className="text-sm font-semibold text-violet-900">
        Once registered, you can attempt the exam on the scheduled date and time.
      </p>
    </div>
  );
}
