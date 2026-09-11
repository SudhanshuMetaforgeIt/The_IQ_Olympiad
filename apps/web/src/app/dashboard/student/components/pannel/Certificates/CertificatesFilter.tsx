"use client";

import React from "react";

interface CertificatesFilterProps {
  totalCount: number;
}

export function CertificatesFilter({ totalCount }: CertificatesFilterProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-600 text-white shadow-xs select-none">
        All Certificates ({totalCount})
      </span>
    </div>
  );
}
