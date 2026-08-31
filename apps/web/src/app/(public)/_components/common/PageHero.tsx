"use client";

import React from "react";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 text-white py-16 sm:py-20">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 text-center relative z-10 max-w-4xl mx-auto">
        {badge && (
          <span className="text-xs font-extrabold text-purple-200 tracking-wider uppercase bg-purple-800/60 border border-purple-400/30 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-purple-100/90 font-medium leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export default PageHero;
