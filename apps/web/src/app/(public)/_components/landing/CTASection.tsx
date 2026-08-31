"use client";

import React from "react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <div className="p-12 sm:p-16 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-pink-600 text-center text-white shadow-2xl shadow-purple-950/20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
            Your journey starts here.
          </h2>
          <p className="text-sm sm:text-base text-purple-100/90 font-medium leading-relaxed max-w-xl mx-auto mb-8">
            Join THE IQ OLYMPIAD and turn daily learning into lasting confidence.
          </p>


        </div>
      </div>
    </section>
  );
}
