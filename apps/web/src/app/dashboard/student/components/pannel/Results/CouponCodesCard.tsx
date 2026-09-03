"use client";

import React, { useState } from "react";
import { COUPON_CODES } from "./mockResultsData";

export function CouponCodesCard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-violet-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" x2="7.01" y1="7" y2="7" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Coupon Codes
            </h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Use these coupons to get discounts on upcoming Olympiads.
            </p>
          </div>
        </div>

        {/* Coupons List */}
        <div className="space-y-3">
          {COUPON_CODES.length === 0 ? (
            <div className="py-10 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
              <p className="text-sm font-medium text-slate-500">No coupons available</p>
            </div>
          ) : (
            COUPON_CODES.map((coupon) => {
              const isCopied = copiedId === coupon.id;
              return (
                <div
                  key={coupon.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-dashed border-violet-200 bg-violet-50/40 hover:bg-violet-50/70 transition gap-3"
                >
                  {/* Code Tag */}
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-dashed border-violet-300 shadow-2xs">
                    <span className="text-xs font-black text-violet-700 tracking-wider font-mono">
                      {coupon.code}
                    </span>
                  </div>

                  {/* Offer Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {coupon.discountText}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                      {coupon.validityText}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(coupon.id, coupon.code)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                      isCopied
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 shadow-2xs"
                    }`}
                  >
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer View All Coupons Button */}
      <div className="mt-5 pt-3">
        <button
          type="button"
          className="w-full py-2.5 rounded-xl border border-slate-200 text-violet-700 hover:bg-violet-50 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View All Coupons</span>
          <span className="text-violet-500 font-bold">›</span>
        </button>
      </div>
    </div>
  );
}
