"use client";

import React, { useState } from "react";
import {
  Bot,
  X,
  Send,
  Rocket,
  Users,
  ClipboardCheck,
  PieChart,
  PlayCircle,
  Sparkles,
  ThumbsUp,
  CheckCheck,
} from "lucide-react";

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  time: string;
  text?: string;
  isInitialStepReply?: boolean;
  steps?: string[];
  outroText?: string;
  suggestionChips?: { id: string; label: string; icon?: React.ReactNode }[];
}

export function HelpSupportModal({ isOpen, onClose }: HelpSupportModalProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-user-1",
      sender: "user",
      text: "How do I register students for an exam?",
      time: "10:30 AM",
    },
    {
      id: "msg-bot-1",
      sender: "bot",
      isInitialStepReply: true,
      time: "10:30 AM",
      text: "To register students for an exam, follow these steps:",
      steps: [
        "Go to Exam Registration from the sidebar",
        'Click on "Register New Exam"',
        "Select the exam, class, and subject",
        "Choose students to register",
        "Review and confirm the registration",
      ],
      outroText: "Would you like me to guide you through any specific step?",
      suggestionChips: [
        {
          id: "step1",
          label: "Yes, show me step 1",
          icon: <PlayCircle className="w-4 h-4 text-purple-600" />,
        },
        {
          id: "step2",
          label: "Yes, show me step 2",
          icon: <Sparkles className="w-4 h-4 text-purple-600" />,
        },
        {
          id: "helpful",
          label: "No, that's helpful",
          icon: <ThumbsUp className="w-4 h-4 text-purple-600" />,
        },
      ],
    },
  ]);

  if (!isOpen) return null;

  const handleTopicClick = (topicName: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: `Tell me about ${topicName}`,
      time,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = `Here is information regarding ${topicName}:`;
      let stepsList: string[] = [];
      if (topicName === "Get Started") {
        stepsList = [
          "Set up your school profile in Settings",
          "Add or import your students in the Students tab",
          "Register students for available Olympiad exams",
        ];
      } else if (topicName === "Students") {
        stepsList = [
          "Navigate to the Students menu",
          "Use 'Add Student' for manual entry or 'Import CSV' for bulk upload",
          "View and manage student details & credentials",
        ];
      } else if (topicName === "Exams") {
        stepsList = [
          "Check active Olympiads under Exam Registration",
          "Select student batches and complete fee verification",
          "Track upcoming exam dates and schedules",
        ];
      } else {
        stepsList = [
          "Go to Reports from the sidebar menu",
          "Select class, subject, or exam filter",
          "Download PDF/Excel analytical performance summaries",
        ];
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: replyText,
        steps: stepsList,
        outroText: "Is there anything else I can help you with?",
        suggestionChips: [
          { id: "step1", label: "Show more details", icon: <PlayCircle className="w-4 h-4 text-purple-600" /> },
          { id: "helpful", label: "No, that's helpful", icon: <ThumbsUp className="w-4 h-4 text-purple-600" /> },
        ],
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userQuery = query.trim();
    setQuery("");

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userQuery,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `Thanks for asking! Regarding "${userQuery}":`,
        steps: [
          "Check your dashboard navigation items for quick actions",
          "Refer to your school admin settings for configuration",
          "Contact support directly if urgent assistance is required",
        ],
        outroText: "Would you like further guidance on this topic?",
        suggestionChips: [
          { id: "helpful", label: "No, that's helpful", icon: <ThumbsUp className="w-4 h-4 text-purple-600" /> },
        ],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const handleChipClick = (chipLabel: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: chipLabel,
      time,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `Great! Here is step guidance for "${chipLabel}":`,
        steps: [
          "Follow the instructions highlighted on your screen",
          "Verify your selections before clicking submit",
        ],
        outroText: "Let me know if you need anything else!",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 left-0 lg:left-68 z-30 bg-white flex flex-col p-6 sm:p-8 md:p-10 text-slate-900 font-sans overflow-hidden animate-in fade-in duration-200 border-l border-slate-100">
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 sm:right-7 sm:top-7 w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer z-10"
          aria-label="Close Help & Support Modal"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Modal Title Banner */}
        <div className="flex items-start space-x-4 pr-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/30">
            <Bot className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              How can I help you today?
            </h2>
            <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1.5">
              I&apos;m here to help you with any questions about The IQ Olympiad platform.
            </p>
          </div>
        </div>

        {/* 4 Quick Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-7 mb-5 shrink-0">
          <div
            onClick={() => handleTopicClick("Get Started")}
            className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer flex items-center space-x-3.5 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Rocket className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Get Started
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-1">
                Learn how to get started with the platform
              </p>
            </div>
          </div>

          <div
            onClick={() => handleTopicClick("Students")}
            className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer flex items-center space-x-3.5 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Students
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-1">
                Learn about student management
              </p>
            </div>
          </div>

          <div
            onClick={() => handleTopicClick("Exams")}
            className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer flex items-center space-x-3.5 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Exams
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-1">
                Learn about exams and registrations
              </p>
            </div>
          </div>

          <div
            onClick={() => handleTopicClick("Reports")}
            className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer flex items-center space-x-3.5 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PieChart className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Reports
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium truncate mt-1">
                Learn about reports and analytics
              </p>
            </div>
          </div>
        </div>

        {/* Date Divider Pill */}
        <div className="relative flex items-center justify-center my-4 shrink-0">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative bg-purple-50 text-purple-700 font-bold text-xs sm:text-sm px-5 py-1 rounded-full border border-purple-100 shadow-xs">
            Today
          </div>
        </div>

        {/* Chat Scroll Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 my-2 scrollbar-thin scrollbar-thumb-slate-200">
          {messages.map((m) => {
            if (m.sender === "user") {
              return (
                <div key={m.id} className="flex justify-end items-end">
                  <div className="bg-[#4F46E5] text-white px-6 py-3.5 rounded-2xl rounded-tr-xs shadow-sm max-w-2xl flex items-center justify-between space-x-4">
                    <span className="text-sm sm:text-base font-bold leading-relaxed">{m.text}</span>
                    <span className="text-xs text-indigo-200 font-semibold shrink-0 flex items-center gap-1">
                      {m.time} <CheckCheck className="w-4 h-4 text-indigo-200 inline" />
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id} className="space-y-3.5">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md mt-0.5">
                    <Bot className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="bg-slate-50/90 border border-slate-200/70 rounded-2xl rounded-tl-xs p-5 sm:p-6 max-w-3xl text-slate-800 space-y-3.5 shadow-xs">
                    {m.text && (
                      <p className="font-extrabold text-base sm:text-lg text-slate-900 leading-relaxed">{m.text}</p>
                    )}

                    {m.steps && m.steps.length > 0 && (
                      <ol className="space-y-2.5 pl-5 list-decimal marker:text-slate-600 marker:font-bold text-slate-800 font-semibold text-sm sm:text-base">
                        {m.steps.map((st, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {st.includes("Exam Registration") ? (
                              <>
                                Go to <strong className="font-black text-slate-900">Exam Registration</strong> from the sidebar
                              </>
                            ) : st.includes('"Register New Exam"') ? (
                              <>
                                Click on <strong className="font-black text-slate-900">&quot;Register New Exam&quot;</strong>
                              </>
                            ) : (
                              st
                            )}
                          </li>
                        ))}
                      </ol>
                    )}

                    {m.outroText && (
                      <p className="font-semibold text-sm sm:text-base text-slate-600 pt-1 leading-relaxed">{m.outroText}</p>
                    )}

                    <div className="text-xs text-slate-400 font-semibold pt-1">
                      {m.time}
                    </div>
                  </div>
                </div>

                {/* Suggestion Chips */}
                {m.suggestionChips && m.suggestionChips.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 ml-13">
                    {m.suggestionChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleChipClick(chip.label)}
                        className="bg-white hover:bg-purple-50 text-purple-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full border border-purple-200/80 shadow-2xs transition-all hover:border-purple-300 flex items-center space-x-2 cursor-pointer"
                      >
                        {chip.icon}
                        <span>{chip.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar Section */}
        <div className="shrink-0 pt-4 border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-50/80 border border-slate-200 focus:border-purple-500 rounded-2xl pl-6 pr-16 py-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/10 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-purple-600/30 transition cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-center text-slate-400 font-medium mt-3">
            This AI assistant can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
