"use client";

import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ badge, title, description, align = "center" }: SectionHeadingProps) {
  const alignClasses =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center mx-auto";

  return (
    <div className={`mb-12 max-w-3xl ${alignClasses}`}>
      {badge && (
        <span className="text-xs font-extrabold text-purple-700 tracking-wider uppercase bg-purple-100/80 px-4 py-1.5 rounded-full inline-block mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
