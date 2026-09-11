"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type LoginMarketingLayoutProps = {
  children: ReactNode;
  heroImage?: string;
  heroAlt?: string;
};

export default function LoginMarketingLayout({
  children,
  heroImage,
  heroAlt = "The IQ Olympiad illustration",
}: LoginMarketingLayoutProps) {
  const hasHeroImage = Boolean(heroImage);
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const reduceMotion = !ready || prefersReducedMotion === true;

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top_left,#efe7ff,transparent_42%),radial-gradient(circle_at_80%_20%,#ddd6fe,transparent_36%),linear-gradient(180deg,#f6f3ff_0%,#eee9ff_48%,#f8f6ff_100%)]">
      <PaperPlane active={!reduceMotion} />
      <LightBulb active={!reduceMotion} />
      <StarBurst active={!reduceMotion} />
      <BottomPlants />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-4 sm:px-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-10 xl:px-12">
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative z-10 min-h-[36rem] rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_24px_80px_rgba(91,33,182,0.12)] sm:p-8 lg:flex lg:min-h-[40rem] lg:flex-col lg:justify-between">
            {children}
          </div>
        </div>

        <div className="relative hidden h-full min-h-0 lg:block">
          {hasHeroImage && heroImage ? (
            <div className="absolute inset-0">
              <motion.div
                key={heroImage}
                className="absolute inset-0"
                initial={false}
                animate={
                  reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 0.8, 0] }
                }
                transition={{
                  duration: 5.2,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain object-center drop-shadow-[0_8px_10px_rgba(49,20,90,0.22)] drop-shadow-[0_22px_28px_rgba(76,29,149,0.32)] drop-shadow-[0_48px_70px_rgba(49,20,90,0.28)]"
                />
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PaperPlane({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-[44%] top-4 hidden lg:block"
      initial={false}
      animate={active ? { y: [0, -8, 0], x: [0, 6, 0], rotate: [0, 4, 0] } : undefined}
      transition={{ duration: 6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <svg width="120" height="86" viewBox="0 0 120 86" fill="none">
        <path
          d="M8 62c18-6 38-18 52-34"
          stroke="#C4B5FD"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <path d="M78 8 112 44 64 40 78 8Z" fill="#8B5CF6" />
        <path d="M78 8 64 40 54 28 78 8Z" fill="#6D28D9" />
        <path d="M64 40 112 44 70 58 64 40Z" fill="#A78BFA" />
      </svg>
    </motion.div>
  );
}

function LightBulb({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute right-[16%] top-4 hidden xl:block"
      initial={false}
      animate={active ? { scale: [1, 1.08, 1] } : undefined}
      transition={{ duration: 2.8, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-2 rounded-full bg-amber-200/70 blur-xl"
          initial={false}
          animate={active ? { opacity: [0.55, 1, 0.55] } : undefined}
          transition={{ duration: 2.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        />
        <svg width="54" height="54" viewBox="0 0 24 24" className="relative fill-amber-300">
          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
        </svg>
      </div>
    </motion.div>
  );
}

function StarBurst({ active }: { active: boolean }) {
  return (
    <motion.svg
      className="pointer-events-none absolute right-[10%] top-16 hidden fill-amber-400 xl:block"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      initial={false}
      animate={active ? { rotate: [0, 25, 0], scale: [1, 1.25, 1] } : undefined}
      transition={{ duration: 3.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <path d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8z" />
    </motion.svg>
  );
}

function BottomPlants() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-100/40 to-transparent" />
  );
}
