"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AuthSplitLayoutProps = {
  children: ReactNode;
  sidePanel: ReactNode;
  maxWidthClass?: string;
};

export default function AuthSplitLayout({
  children,
  sidePanel,
}: AuthSplitLayoutProps) {
  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top_left,#efe7ff,transparent_42%),radial-gradient(circle_at_80%_20%,#ddd6fe,transparent_36%),linear-gradient(180deg,#f6f3ff_0%,#eee9ff_48%,#f8f6ff_100%)]">
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12">
        <motion.div
          className="flex h-full min-h-0 flex-col px-5 py-4 sm:px-8 lg:col-span-7 lg:px-12 lg:py-6"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
        {sidePanel}
      </div>
    </div>
  );
}
