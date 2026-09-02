import React from "react";

export function OlympiadAchieverBadgeGraphic({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Sparkles */}
      <span className="absolute -top-1 -left-1 text-amber-400 text-xs animate-pulse">✦</span>
      <span className="absolute -bottom-1 -right-1 text-amber-400 text-xs animate-pulse">✦</span>

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="goldShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="innerShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* Outer Shield */}
        <path
          d="M50 8 L82 20 C82 55, 50 88, 50 88 C50 88, 18 55, 18 20 Z"
          fill="url(#goldShieldGrad)"
          stroke="#B45309"
          strokeWidth="2.5"
        />

        {/* Inner Shield */}
        <path
          d="M50 14 L76 24 C76 52, 50 80, 50 80 C50 80, 24 52, 24 24 Z"
          fill="url(#innerShieldGrad)"
        />

        {/* Trophy Cup */}
        <path
          d="M38 34 H62 V48 C62 55, 56 60, 50 60 C44 60, 38 55, 38 48 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        {/* Handles */}
        <path d="M38 38 C32 38, 30 46, 38 48" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M62 38 C68 38, 70 46, 62 48" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        {/* Trophy Base */}
        <rect x="44" y="60" width="12" height="6" fill="#D97706" />
        <rect x="40" y="66" width="20" height="5" rx="2" fill="#B45309" />
        {/* Star on Cup */}
        <path
          d="M50 40 L52 44.5 L57 45 L53.5 48 L54.5 53 L50 50.5 L45.5 53 L46.5 48 L43 45 L48 44.5 Z"
          fill="#FFFFFF"
        />
        {/* Red Ribbon Tails */}
        <path d="M36 68 L30 78 L38 75 L42 78 L40 68 Z" fill="#EF4444" />
        <path d="M64 68 L70 78 L62 75 L58 78 L60 68 Z" fill="#DC2626" />
      </svg>
    </div>
  );
}

export function ProblemSolverBadgeGraphic({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Sparkles */}
      <span className="absolute -top-1 -left-1 text-purple-400 text-xs animate-pulse">✦</span>
      <span className="absolute -bottom-1 -right-1 text-purple-400 text-xs animate-pulse">✦</span>

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="purpleShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="purpleInnerShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
        </defs>

        {/* Outer Shield */}
        <path
          d="M50 8 L82 20 C82 55, 50 88, 50 88 C50 88, 18 55, 18 20 Z"
          fill="url(#purpleShieldGrad)"
          stroke="#5B21B6"
          strokeWidth="2.5"
        />

        {/* Inner Shield */}
        <path
          d="M50 14 L76 24 C76 52, 50 80, 50 80 C50 80, 24 52, 24 24 Z"
          fill="url(#purpleInnerShieldGrad)"
        />

        {/* Brain Graphic */}
        <g transform="translate(30, 30) scale(0.85)">
          {/* Left Hemisphere */}
          <path
            d="M20 10 C14 10, 8 16, 8 22 C4 24, 2 30, 4 36 C2 42, 6 48, 12 50 C14 54, 18 56, 22 54"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right Hemisphere */}
          <path
            d="M28 10 C34 10, 40 16, 40 22 C44 24, 46 30, 44 36 C46 42, 42 48, 36 50 C34 54, 30 56, 26 54"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center Dividing Line */}
          <line x1="24" y1="10" x2="24" y2="54" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Inner gyri */}
          <circle cx="16" cy="22" r="2.5" fill="#7C3AED" />
          <circle cx="32" cy="22" r="2.5" fill="#7C3AED" />
          <circle cx="14" cy="34" r="2.5" fill="#7C3AED" />
          <circle cx="34" cy="34" r="2.5" fill="#7C3AED" />
          <circle cx="18" cy="44" r="2.5" fill="#7C3AED" />
          <circle cx="30" cy="44" r="2.5" fill="#7C3AED" />
        </g>
      </svg>
    </div>
  );
}

/* 3D Metallic Slate Locked Badges Graphics */

export function AccuracyMasterBadgeGraphic({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="slateShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="slateInnerShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="metallicBevel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer 3D Shield */}
        <path
          d="M50 6 L84 19 C84 55, 50 90, 50 90 C50 90, 16 55, 16 19 Z"
          fill="url(#slateShieldGrad)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Beveled Middle Border */}
        <path
          d="M50 11 L78 22 C78 52, 50 82, 50 82 C50 82, 22 52, 22 22 Z"
          fill="url(#slateInnerShieldGrad)"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* Target Bullseye in 3D White/Silver */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="#E2E8F0" strokeWidth="3" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
        <circle cx="50" cy="50" r="6" fill="#F8FAFC" />

        {/* Dart / Arrow hitting bullseye */}
        <line x1="72" y1="28" x2="52" y2="48" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <polygon points="72,24 78,30 74,34 68,28" fill="#F8FAFC" />
        <path d="M54 46 L50 50 L46 54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function RisingStarBadgeGraphic({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="slateShieldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="slateInnerShieldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Outer 3D Shield */}
        <path
          d="M50 6 L84 19 C84 55, 50 90, 50 90 C50 90, 16 55, 16 19 Z"
          fill="url(#slateShieldGrad2)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Inner Shield */}
        <path
          d="M50 11 L78 22 C78 52, 50 82, 50 82 C50 82, 22 52, 22 22 Z"
          fill="url(#slateInnerShieldGrad2)"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* Growth Bar Chart */}
        <rect x="34" y="52" width="7" height="15" rx="2" fill="#E2E8F0" />
        <rect x="45" y="43" width="7" height="24" rx="2" fill="#E2E8F0" />
        <rect x="56" y="34" width="7" height="33" rx="2" fill="#E2E8F0" />

        {/* Upward Growth Arrow */}
        <path
          d="M32 46 L46 35 L56 40 L69 26"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="69,22 74,31 65,30" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

export function ConsistencyChampionBadgeGraphic({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="slateShieldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="slateInnerShieldGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Outer 3D Shield */}
        <path
          d="M50 6 L84 19 C84 55, 50 90, 50 90 C50 90, 16 55, 16 19 Z"
          fill="url(#slateShieldGrad3)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Inner Shield */}
        <path
          d="M50 11 L78 22 C78 52, 50 82, 50 82 C50 82, 22 52, 22 22 Z"
          fill="url(#slateInnerShieldGrad3)"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* Calendar Box */}
        <rect x="30" y="32" width="40" height="38" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M30 43 H70" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="30" y="32" width="40" height="11" rx="6" fill="#64748B" />

        {/* Calendar Pins */}
        <rect x="38" y="27" width="4" height="8" rx="2" fill="#FFFFFF" />
        <rect x="58" y="27" width="4" height="8" rx="2" fill="#FFFFFF" />

        {/* Checkmark Circle on Calendar */}
        <circle cx="58" cy="58" r="8" fill="#1E293B" />
        <path
          d="M54 58 L57 61 L62 55"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Date dots */}
        <circle cx="38" cy="52" r="1.5" fill="#64748B" />
        <circle cx="45" cy="52" r="1.5" fill="#64748B" />
        <circle cx="52" cy="52" r="1.5" fill="#64748B" />
        <circle cx="38" cy="60" r="1.5" fill="#64748B" />
        <circle cx="45" cy="60" r="1.5" fill="#64748B" />
      </svg>
    </div>
  );
}

export function OlympiadChampionBadgeGraphic({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="slateShieldGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="slateInnerShieldGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Outer 3D Shield */}
        <path
          d="M50 6 L84 19 C84 55, 50 90, 50 90 C50 90, 16 55, 16 19 Z"
          fill="url(#slateShieldGrad4)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Inner Shield */}
        <path
          d="M50 11 L78 22 C78 52, 50 82, 50 82 C50 82, 22 52, 22 22 Z"
          fill="url(#slateInnerShieldGrad4)"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* Royal Crown */}
        <path
          d="M32 62 L32 42 L42 50 L50 36 L58 50 L68 42 L68 62 Z"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Crown Jewels */}
        <circle cx="32" cy="40" r="2.5" fill="#E2E8F0" />
        <circle cx="50" cy="34" r="3" fill="#FFFFFF" />
        <circle cx="68" cy="40" r="2.5" fill="#E2E8F0" />
        {/* Crown base band */}
        <rect x="32" y="60" width="36" height="4" rx="1" fill="#94A3B8" />
      </svg>
    </div>
  );
}

export function TrophyIllustrationPurple({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <span className="absolute -top-1 left-2 text-violet-300 text-sm animate-pulse">✦</span>
      <span className="absolute bottom-2 -right-1 text-purple-400 text-xs animate-pulse">✦</span>

      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="trophyPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="40%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        {/* Handles */}
        <path d="M36 44 C24 44, 20 60, 36 66" fill="none" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
        <path d="M84 44 C96 44, 100 60, 84 66" fill="none" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />

        {/* Trophy Cup Body */}
        <path
          d="M36 36 H84 V64 C84 76, 74 86, 60 86 C46 86, 36 76, 36 64 Z"
          fill="url(#trophyPurpleGrad)"
          stroke="#5B21B6"
          strokeWidth="2"
        />

        {/* Star in Center of Cup */}
        <path
          d="M60 48 L62.5 54 L69 54.8 L64 59.2 L65.5 65.5 L60 62.2 L54.5 65.5 L56 59.2 L51 54.8 L57.5 54 Z"
          fill="#FFFFFF"
        />

        {/* Stem */}
        <rect x="54" y="86" width="12" height="12" fill="#7C3AED" rx="2" />

        {/* Base */}
        <rect x="42" y="98" width="36" height="10" rx="3" fill="#5B21B6" />
        <rect x="46" y="95" width="28" height="5" rx="1.5" fill="#8B5CF6" />
      </svg>
    </div>
  );
}
