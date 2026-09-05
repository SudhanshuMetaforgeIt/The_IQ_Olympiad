"use client";

import React from "react";

export function StudentsHeader() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Students
      </h1>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
        Manage all registered students for Olympiad exams
      </p>
    </div>
  );
}
