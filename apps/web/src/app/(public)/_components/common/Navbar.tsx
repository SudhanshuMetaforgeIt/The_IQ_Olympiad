"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/50 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <svg className="size-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L14.85 8.65L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.15 8.65L12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-slate-900 group-hover:text-purple-900 transition-colors">
              THE IQ OLYMPIAD
            </span>
            <span className="text-[10px] font-extrabold tracking-wider text-purple-700 uppercase">
              Excel. Compete. Achieve.
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/olympiads"
            className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
          >
            Olympiads
          </Link>
          <Link
            href="/subjects"
            className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
          >
            Subjects
          </Link>
          <Link
            href="/how-it-works"
            className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
          >
            How It Works
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link href="/signup">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-6 py-2.5 text-xs font-extrabold text-white shadow-md shadow-purple-600/25 hover:opacity-95 hover:scale-105 transition-all cursor-pointer"
            >
              Sign Up
              <svg className="size-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2L14.85 8.65L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.15 8.65L12 2Z" />
              </svg>
            </button>
          </Link>

          <Link href="/login">
            <button
              type="button"
              className="rounded-full border border-slate-200/80 bg-slate-50/80 px-5 py-2.5 text-xs font-extrabold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
