"use client";

import React, { useState, useRef, useEffect } from "react";

interface ChatbotPanelProps {
  onBack: () => void;
  whatsappNumber?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

// Exactly 4 Subjects: Maths, Science, English, GK
const SUBJECT_QUESTIONS = [
  {
    id: "maths",
    title: "Maths",
    subtitle: "Help with topics and problems",
    icon: "π",
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
    query: "Can you help me with Maths Olympiad topics, formulas, and practice problems?",
  },
  {
    id: "science",
    title: "Science",
    subtitle: "Concepts and practice questions",
    icon: "🧪",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    query: "What are the key Science concepts and chapters for Class 8 Olympiad?",
  },
  {
    id: "english",
    title: "English",
    subtitle: "Grammar and comprehension",
    icon: "📖",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    query: "How can I improve my English grammar and reading comprehension for Olympiad?",
  },
  {
    id: "gk",
    title: "General Knowledge",
    subtitle: "Facts and current affairs",
    icon: "📊",
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    query: "Where can I find current affairs and GK study material for the Olympiad?",
  },
];

const COMMON_QUESTIONS = [
  { id: "1", label: "📅 When is my next Olympiad exam?", query: "When is my next Olympiad exam scheduled?" },
  { id: "2", label: "📊 Where can I see my test results?", query: "Where can I see my subject test results and scorecard?" },
  { id: "3", label: "🏆 How do I unlock achievement badges?", query: "How do I unlock more achievement badges and honors?" },
  { id: "4", label: "📜 Where can I download certificates?", query: "Where can I download my official merit certificate?" },
];

export function ChatbotPanel({
  onBack,
  whatsappNumber = "+91 98765 43210",
}: ChatbotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: `Hello Rahul! 👋 I'm your IQ Olympiad AI Assistant.\n\nHow can I help you today? Ask me anything regarding exam schedules, practice tests, results, scorecards, certificates, or account settings.`,
      time: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOpenWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      "Hello IQ Olympiad Support, I am a student and I need immediate assistance with my account/exam."
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
        "Thank you for asking! For immediate support or live assistance with our team, you can also connect directly on WhatsApp using the button above.";
      const lower = text.toLowerCase();

      if (lower.includes("math")) {
        reply =
          "For Mathematics Olympiad (Class 8), high-weightage topics include Rational Numbers, Linear Equations, Algebraic Expressions, Geometry, Mensuration, and Data Handling. Practice chapter mock tests in the 'Practice' tab to boost your score!";
      } else if (lower.includes("science")) {
        reply =
          "For Science Olympiad, focus on Crop Production, Microorganisms, Synthetic Fibres, Metals & Non-metals, Force & Pressure, Sound, Light, and Chemical Effects of Electric Current. Check the 'Practice' section for topic-wise tests.";
      } else if (lower.includes("english")) {
        reply =
          "For English Olympiad, review Tenses, Prepositions, Active/Passive Voice, Synonyms & Antonyms, Idioms & Phrases, and Reading Comprehension passages.";
      } else if (lower.includes("gk") || lower.includes("general knowledge")) {
        reply =
          "General Knowledge questions cover Indian & World History, Geography, Basic Science discoveries, Current Affairs, Sports milestones, and National Awards.";
      } else if (lower.includes("exam") || lower.includes("when") || lower.includes("schedule")) {
        reply =
          "Your upcoming registered exam is the Cyber Olympiad 2026 on 15 Oct 2026. Make sure to complete camera and microphone verification before entering the exam room.";
      } else if (lower.includes("result") || lower.includes("score") || lower.includes("marks")) {
        reply =
          "All your test scores are out of 100 marks! Open the 'Results' tab and click any Olympiad or Practice test row to view your section-wise scorecard.";
      } else if (lower.includes("badge") || lower.includes("honor") || lower.includes("unlock")) {
        reply =
          "You've earned 2 top badges: 'Olympiad Achiever' 🏆 and 'Problem Solver' 🧠! Check 'Certificates > My Badges' to view your progress towards unlocking Accuracy Master.";
      } else if (lower.includes("certificate") || lower.includes("download")) {
        reply =
          "You can preview and download your official accredited participation and merit certificates in PDF format directly from the 'Certificates' tab.";
      } else if (lower.includes("whatsapp") || lower.includes("live") || lower.includes("support")) {
        reply =
          "Click the green 'Chat on WhatsApp' button in the top right to chat instantly with our live student support helpline.";
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
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shadow-2xs shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer shadow-2xs"
          >
            <span>←</span>
            <span>Back to Settings</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20 shrink-0">
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
                <h1 className="text-base font-black text-slate-900 tracking-tight">
                  IQ Olympiad AI Assistant
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400">
                Instant answers to your Olympiad questions
              </p>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-400/90 text-emerald-700 font-bold text-xs transition cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </button>

          <div className="size-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xs shadow-xs">
            N
          </div>
        </div>
      </header>

      {/* Main Chat Scroll Canvas - Full Width without awkward left/right margins */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
        <div className="w-full space-y-6">
          {/* Date Badge */}
          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-full text-xs font-bold text-violet-700 bg-violet-100/70 border border-violet-200/80 shadow-2xs">
              Today, 16 May 2025
            </span>
          </div>

          {/* Initial Bot Welcome Speech Bubble */}
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20 text-xs mt-1">
              🤖
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl rounded-tl-none p-5 sm:p-6 shadow-xs max-w-2xl space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line">
                {messages[0].text}
              </p>
              <span className="text-[10px] font-bold text-slate-400 block pt-1">
                Just now
              </span>
            </div>
          </div>

          {/* Section 1: Subjects related questions (Maths, Science, English, GK) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-violet-600 font-bold text-sm">✦</span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                Subjects related questions
              </h3>
            </div>

            {/* 4-column Grid covering full width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {SUBJECT_QUESTIONS.map((subj) => (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => sendMessage(subj.query)}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-violet-300 hover:shadow-md transition-all text-left flex items-center gap-3.5 cursor-pointer group shadow-2xs"
                >
                  <div
                    className={`size-10 rounded-xl ${subj.iconBg} border flex items-center justify-center font-black text-base shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    {subj.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-violet-700 transition-colors truncate">
                      {subj.title}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                      {subj.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Other common questions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-violet-600 font-bold text-sm">✦</span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                Other common questions
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {COMMON_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => sendMessage(q.query)}
                  className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-violet-300 hover:bg-violet-50/50 text-slate-700 font-bold text-xs transition shadow-2xs cursor-pointer"
                >
                  {q.label}
                </button>
              ))}

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="px-4 py-2.5 rounded-2xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 font-bold text-xs transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                </svg>
                <span>Talk to live support on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* User Follow-up Messages (if any sent) */}
          {messages.slice(1).map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-3 pt-2 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "bot" && (
                <div className="size-8 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm font-medium ${
                  m.sender === "user"
                    ? "bg-violet-600 text-white rounded-br-none shadow-md shadow-violet-500/15"
                    : "bg-white text-slate-900 border border-slate-200/80 rounded-bl-none shadow-xs"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                <span
                  className={`text-[10px] font-bold block mt-2 ${
                    m.sender === "user" ? "text-violet-200 text-right" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </span>
              </div>

              {m.sender === "user" && (
                <div className="size-8 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  RS
                </div>
              )}
            </div>
          ))}

          {/* Live Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 pt-2">
              <div className="size-8 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 text-xs">
                🤖
              </div>
              <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-violet-400 animate-bounce" />
                <span className="size-2 rounded-full bg-violet-500 animate-bounce [animation-delay:0.2s]" />
                <span className="size-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Bottom Input Area covering full width cleanly */}
      <footer className="bg-white border-t border-slate-200/80 p-4 sm:p-6 shrink-0">
        <div className="w-full space-y-3">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-3 p-2 pl-4 rounded-2xl border-2 border-violet-200 focus-within:border-violet-600 bg-white transition shadow-xs w-full"
          >
            <span className="text-violet-600 font-black text-sm">✦</span>
            <input
              type="text"
              placeholder="Ask anything about exams, results, scorecards, certificates..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            {/* Attachment Button */}
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Attach File"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-black text-xs transition cursor-pointer shadow-md shadow-violet-500/25 flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Privacy & Footer Notice */}
          <div className="text-center space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-violet-700">
              <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Your privacy is important to us. This conversation is secure and confidential.</span>
            </div>
            <p className="text-[10px] font-medium text-slate-400">
              Powered by IQ Olympiad Assistant • Instant AI Answers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
