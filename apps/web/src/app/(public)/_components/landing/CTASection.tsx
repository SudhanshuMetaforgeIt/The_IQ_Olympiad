"use client";

import React from "react";

export default function CTASection() {
  return (
    <section className="py-16 bg-white w-full font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-[1920px] mx-auto">
        <div className="p-12 sm:p-16 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-pink-600 text-center text-white shadow-2xl shadow-purple-950/20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white">
            Your journey starts here.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-purple-100/90 font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
            Join THE IQ OLYMPIAD and turn daily learning into lasting confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
