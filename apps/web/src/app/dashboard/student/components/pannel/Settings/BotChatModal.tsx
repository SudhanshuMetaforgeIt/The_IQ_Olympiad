"use client";

import React, { useState, useRef, useEffect } from "react";

interface BotChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  "📅 When is my next exam?",
  "📊 Where are my test results?",
  "🏅 How do I unlock badges?",
  "📜 Where can I download certificates?",
  "💬 Connect on WhatsApp",
];

export function BotChatModal({
  isOpen,
  onClose,
  whatsappNumber = "+91 98765 43210",
}: BotChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello Rahul! 👋 I'm your IQ Olympiad AI Assistant. How can I help you today? Ask me about exam schedules, results, syllabus, badges, or certificates.",
      time: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleOpenWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      "Hello IQ Olympiad Support, I am a student and I need immediate assistance."
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        "Thank you for asking! For immediate support or live assistance with our team, you can also connect directly on WhatsApp.";
      const lower = text.toLowerCase();

      if (lower.includes("exam") || lower.includes("date") || lower.includes("when")) {
        reply =
          "Your upcoming exam is the Cyber Olympiad 2026 on 15 Oct 2026. Practice mock tests are available in the 'Practice' panel.";
      } else if (
        lower.includes("result") ||
        lower.includes("score") ||
        lower.includes("marks")
      ) {
        reply =
          "All test scores are out of 100 marks! Go to the 'Results' tab and click any exam row to view your section-wise scorecard.";
      } else if (lower.includes("badge") || lower.includes("honor") || lower.includes("unlock")) {
        reply =
          "You've earned 'Olympiad Achiever' 🏆 and 'Problem Solver' 🧠! Check 'Certificates > My Badges' to view upcoming unlocks.";
      } else if (lower.includes("certificate") || lower.includes("download")) {
        reply =
          "You can preview and download official certificates in PDF format from the 'Certificates' tab.";
      } else if (lower.includes("whatsapp") || lower.includes("support") || lower.includes("human")) {
        reply =
          "You can connect directly with our live support team on WhatsApp (+91 98765 43210) for instant help.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="flex-1 hidden sm:block" onClick={onClose} />

      {/* Right-Side Sliding Drawer Container */}
      <div className="w-full max-w-md sm:max-w-lg bg-white h-screen shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300 z-10">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  IQ Olympiad Bot
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400">
                Instant AI answers & support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition cursor-pointer"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
              </svg>
            </button>

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
        </div>

        {/* Suggested Prompts Strip */}
        <div className="p-3 bg-slate-50/80 border-b border-slate-100 overflow-x-auto whitespace-nowrap shrink-0">
          <div className="flex items-center gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="text-[11px] font-bold text-slate-700 bg-white hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 border border-slate-200/90 rounded-xl px-3 py-1.5 transition shadow-2xs cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-slate-50/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2.5 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Bot Icon */}
              {m.sender === "bot" && (
                <div className="size-7 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm font-medium ${
                  m.sender === "user"
                    ? "bg-violet-600 text-white rounded-br-none shadow-xs"
                    : "bg-white text-slate-900 border border-slate-200/80 rounded-bl-none shadow-2xs"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                <span
                  className={`text-[9px] font-bold block mt-1.5 ${
                    m.sender === "user" ? "text-violet-200 text-right" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </span>
              </div>

              {/* User Avatar */}
              {m.sender === "user" && (
                <div className="size-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-[10px] shadow-xs">
                  RS
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 text-xs">
                🤖
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-none px-3.5 py-2.5 shadow-2xs flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-violet-400 animate-bounce" />
                <span className="size-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:0.2s]" />
                <span className="size-1.5 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Form */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200/90 shrink-0">
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about exams, results..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-violet-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <p className="text-[10px] font-medium text-slate-400 text-center mt-1.5">
            IQ Olympiad AI Assistant • Instant Support
          </p>
        </div>
      </div>
    </div>
  );
}
