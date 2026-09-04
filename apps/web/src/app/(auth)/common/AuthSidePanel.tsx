"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const FEATURES = [
  {
    label: "AI-guided practice",
    color: "bg-violet-100 text-violet-700",
    path: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  },
  {
    label: "Real Olympiad experience",
    color: "bg-purple-100 text-purple-700",
    path: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c2.22-.48 3.88-2.3 4.39-4.54C19.08 11.05 21 8.97 21 6.4V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
  },
  {
    label: "Instant, useful feedback",
    color: "bg-indigo-100 text-indigo-700",
    path: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  },
] as const;

type AuthSidePanelProps = {
  imageHeightClass?: string;
  badgeIcon?: "star" | "sparkle";
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function AuthSidePanel({
  badgeIcon = "sparkle",
}: AuthSidePanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const reduceMotion = !ready || prefersReducedMotion === true;

  return (
    <div className="hidden h-full min-h-0 flex-col justify-between border-l border-white/40 px-8 py-6 lg:col-span-5 lg:flex xl:px-10 xl:py-8">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 size-11 shrink-0 rounded-2xl bg-violet-100 border border-violet-200/60 flex items-center justify-center text-violet-600 shadow-sm">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            {badgeIcon === "star" ? (
              <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
            ) : (
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            )}
          </svg>
        </div>

        <h3 className="text-3xl font-black tracking-tight leading-tight text-slate-900 xl:text-4xl">
          Practice smarter.
          <br />
          <span className="text-slate-900">Compete confidently.</span>
        </h3>

        <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600">
          A complete Olympiad workspace for personalised learning, real exam
          practice and meaningful progress.
        </p>

        <div className="relative mt-6 min-h-0 flex-1 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={
              reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 0.6, 0] }
            }
            transition={{
              duration: 5.2,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/ai-teacher-3d-transparent.png"
              alt="IQ Olympiad AI Mascot"
              fill
              className="object-contain object-center drop-shadow-[0_22px_28px_rgba(76,29,149,0.28)]"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="mt-4 grid shrink-0 grid-cols-1 gap-2.5">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={false}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 * index, ease }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
            className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-2.5 shadow-sm backdrop-blur-sm"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${feature.color}`}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d={feature.path} />
              </svg>
            </div>
            <span className="text-sm font-black text-slate-800">{feature.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
