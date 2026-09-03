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
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
              My Coupon & Discount Codes
            </h3>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              Use these exclusive voucher codes during checkout for upcoming Olympiad registrations.
            </p>
          </div>
        </div>
      </div>

      {/* Coupon Cards Grid */}
      {COUPON_CODES.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 py-12 px-4 text-center">
          <p className="text-sm font-bold text-slate-700">No coupons available</p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Discount codes will appear here when they are issued to your account.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {COUPON_CODES.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-dashed border-violet-200 shadow-2xs flex flex-col justify-between gap-3 relative overflow-hidden group hover:border-violet-400 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px]">
                    {coupon.discountText}
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-1 font-mono">
                    {coupon.code}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                    {coupon.validityText}
                  </p>
                </div>

                <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-slate-500">
                  Applicable on all subjects
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs ${
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
                      <span>📋</span>
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
