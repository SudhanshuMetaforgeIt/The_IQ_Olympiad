"use client";

import React from "react";
import { Plus } from "lucide-react";

interface OlympiadsHeroBannerProps {
  onCreateClick: () => void;
}

export function OlympiadsHeroBanner({ onCreateClick }: OlympiadsHeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#311796] via-[#3B1EAE] to-[#4722C9] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-purple-800/40">
      {/* Background Decorative Rings */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute left-1/3 -top-10 w-48 h-48 rounded-full bg-purple-400/10 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section: Icon, Title & Description */}
        <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              <path d="m9 6 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Manage Olympiads
            </h1>
            <p className="text-sm font-medium text-purple-200 mt-1">
              Create and manage all olympiads on the platform
            </p>
          </div>
        </div>

        {/* Center Section: Trophy Illustration Graphic */}
        <div className="hidden lg:flex items-center justify-center relative my-2">
          {/* Sparkles SVG */}
          <div className="relative w-40 h-28 flex items-center justify-center">
            {/* Laurels left */}
            <svg className="w-8 h-16 text-purple-300/60 -mr-2" viewBox="0 0 24 48" fill="currentColor">
              <path d="M20,4 C14,8 10,16 10,24 C10,32 14,40 20,44 C12,38 6,28 6,24 C6,20 12,10 20,4 Z" />
            </svg>
            {/* Golden Trophy Vector */}
            <div className="relative flex flex-col items-center">
              <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100" fill="none">
                {/* Sparkle top left */}
                <path d="M20 15 L22 20 L27 22 L22 24 L20 29 L18 24 L13 22 L18 20 Z" fill="#FDE047" />
                {/* Sparkle top right */}
                <circle cx="78" cy="18" r="3" fill="#FDE047" />
                {/* Trophy Base */}
                <ellipse cx="50" cy="84" rx="26" ry="6" fill="#3B1EAE" opacity="0.4" />
                <rect x="36" y="74" width="28" height="8" rx="4" fill="#6366F1" />
                <rect x="42" y="60" width="16" height="15" fill="#EAB308" />
                {/* Trophy Handles */}
                <path d="M22 28 C12 28 14 50 32 50" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
                <path d="M78 28 C88 28 86 50 68 50" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
                {/* Trophy Cup */}
                <path d="M28 22 H72 V40 C72 52 62 60 50 60 C38 60 28 52 28 40 V22 Z" fill="#FACC15" />
                <path d="M34 22 H66 V38 C66 46 59 52 50 52 C41 52 34 46 34 38 V22 Z" fill="#FDE047" />
                {/* Star on Cup */}
                <path d="M50 28 L53 34 L59 35 L55 39 L56 45 L50 42 L44 45 L45 39 L41 35 L47 34 Z" fill="#EAB308" />
              </svg>
            </div>
            {/* Laurels right */}
            <svg className="w-8 h-16 text-purple-300/60 -ml-2 scale-x-[-1]" viewBox="0 0 24 48" fill="currentColor">
              <path d="M20,4 C14,8 10,16 10,24 C10,32 14,40 20,44 C12,38 6,28 6,24 C6,20 12,10 20,4 Z" />
            </svg>
          </div>
        </div>

        {/* Right Section: Action Button */}
        <button
          type="button"
          onClick={onCreateClick}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-[#3B1EAE] font-extrabold text-sm hover:bg-purple-50 transition-all duration-150 shadow-md active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Create Olympiad</span>
        </button>
      </div>
    </div>
  );
}
