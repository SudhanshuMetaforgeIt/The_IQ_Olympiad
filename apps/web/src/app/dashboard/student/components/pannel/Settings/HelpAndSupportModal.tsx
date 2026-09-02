"use client";

import React from "react";

interface HelpAndSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBotChat: () => void;
  whatsappNumber?: string;
}

export function HelpAndSupportModal({
  isOpen,
  onClose,
  onStartBotChat,
  whatsappNumber = "+91 98765 43210",
}: HelpAndSupportModalProps) {
  if (!isOpen) return null;

  const handleOpenWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      "Hello IQ Olympiad Support, I am a student and I need immediate assistance with my account/exam."
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 pb-2 border-b border-slate-100/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              We&apos;re here to help you!
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Choose any of the options below to get immediate support.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* 2 Support Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* 1. Chat with Bot */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:border-violet-300 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                {/* Bot Icon Graphic */}
                <div className="size-14 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="12" x="3" y="6" rx="2" />
                    <circle cx="9" cy="12" r="1" fill="currentColor" />
                    <circle cx="15" cy="12" r="1" fill="currentColor" />
                    <path d="M12 2v4" />
                    <path d="M2 12h1" />
                    <path d="M21 12h1" />
                    <path d="M9 16h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">
                    Chat with Bot
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                    Get instant answers to your questions from our support bot.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onStartBotChat}
                className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-300 hover:bg-violet-50 text-violet-700 font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Start Chat</span>
              </button>
            </div>

            {/* 2. Chat on WhatsApp */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                {/* WhatsApp Icon Graphic */}
                <div className="size-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                    Connect with our support team on WhatsApp for quick help.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-400 hover:bg-emerald-50 text-emerald-700 font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Bottom Fast Response Alert Strip */}
          <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
            <div className="size-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-blue-900 leading-snug">
              We aim to respond immediately and resolve your queries as fast as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
