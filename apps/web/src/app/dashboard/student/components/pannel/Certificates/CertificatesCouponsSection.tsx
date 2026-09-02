"use client";

import React, { useState } from "react";
import { COUPON_CODES } from "../Results/mockResultsData";

export function CertificatesCouponsSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              My Coupon & Discount Codes
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              Use these exclusive voucher codes during checkout for upcoming Olympiad registrations.
            </p>
          </div>
        </div>
      </div>

      {/* Coupon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {COUPON_CODES.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-3xl p-6 border-2 border-dashed border-violet-200 shadow-xs flex flex-col justify-between gap-5 relative overflow-hidden group hover:border-violet-400 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs">
                  {coupon.discountText}
                </span>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mt-2 font-mono">
                  {coupon.code}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  {coupon.validityText}
                </p>
              </div>

              <div className="size-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium text-slate-500">
                Applicable on all subjects
              </span>
              <button
                type="button"
                onClick={() => handleCopy(coupon.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  copiedCode === coupon.code
                    ? "bg-emerald-600 text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <span>✓</span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
