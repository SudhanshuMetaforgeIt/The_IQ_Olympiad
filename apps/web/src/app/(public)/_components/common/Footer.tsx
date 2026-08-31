"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0F19] text-white py-8 border-t border-slate-800">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px]">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white shadow-sm">
            <svg className="size-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L14.85 8.65L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.15 8.65L12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-white">
              THE IQ OLYMPIAD
            </span>
            <span className="text-[9px] font-extrabold tracking-wider text-purple-400 uppercase">
              Excel. Compete. Achieve.
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400 font-medium text-center">
          © 2026 THE IQ OLYMPIAD. Learn boldly, compete fairly.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-300">
          <Link href="/privacy-policy" className="hover:text-purple-400 transition-colors">
            Privacy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-purple-400 transition-colors">
            Terms
          </Link>
          <Link href="/faq" className="hover:text-purple-400 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
}
