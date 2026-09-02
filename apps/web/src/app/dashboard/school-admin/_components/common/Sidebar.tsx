"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  TrendingUp,
  PieChart,
  Settings,
  LogOut,
  Shield,
  Bot,
  X,
  Send,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [botQuery, setBotQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! I am IQ Assistant. How can I help you today?" },
  ]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard/school-admin", icon: LayoutDashboard },
    { name: "Students", href: "/dashboard/school-admin/students", icon: Users },
    { name: "Exam Registration", href: "/dashboard/school-admin/exam-registration", icon: ClipboardCheck },
    { name: "Exams", href: "/dashboard/school-admin/exams", icon: FileText },
    { name: "Results", href: "/dashboard/school-admin/results", icon: TrendingUp },
    { name: "Reports", href: "/dashboard/school-admin/reports", icon: PieChart },
    { name: "Settings", href: "/dashboard/school-admin/settings", icon: Settings },
  ];

  const handleSendBotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botQuery.trim()) return;
    const userText = botQuery;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setBotQuery("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Thanks for asking about "${userText}". Our team is assisting you!` },
      ]);
    }, 800);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-[#3826B1] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 font-sans ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <Link
            href="/"
            onClick={onClose}
            className="p-6 pb-4 border-b border-purple-500/20 block hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-6.5 h-6.5 text-white stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-wide leading-tight text-white uppercase group-hover:text-purple-200 transition-colors">
                  The IQ <br /> Olympiad
                </h1>
              </div>
            </div>
            <p className="text-xs text-purple-200/90 font-extrabold mt-2.5 tracking-wider uppercase">
              Admin Dashboard
            </p>
          </Link>

          <nav className="p-4 space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/school-admin" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-base sm:text-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#3826B1] shadow-lg font-black"
                      : "text-purple-100/90 hover:bg-white/10 hover:text-white font-extrabold"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 stroke-[2.2] ${isActive ? "text-[#3826B1]" : "text-purple-200"}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 space-y-3">
          <div
            onClick={() => setIsBotOpen(true)}
            className="bg-white/10 hover:bg-white/15 rounded-2xl p-4 border border-white/15 transition-all cursor-pointer shadow-md flex items-center space-x-3.5 group"
          >
            <div className="w-11 h-11 rounded-full bg-white text-[#3826B1] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Bot className="w-6.5 h-6.5 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-white leading-tight">Help & Support</h4>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-xs font-bold text-purple-200">Chat with our bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-purple-100/90 hover:bg-white/10 hover:text-white text-base font-extrabold transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-purple-200 stroke-[2.2]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isBotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 relative font-sans text-slate-900">
            <button
              onClick={() => setIsBotOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#3826B1] flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black">IQ Support Bot</h3>
                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Online 24/7
                </p>
              </div>
            </div>
            <div className="space-y-3 h-60 overflow-y-auto pr-1">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`p-3 rounded-2xl text-xs font-bold ${m.sender === "user" ? "bg-[#3826B1] text-white ml-8 text-right" : "bg-slate-100 text-slate-800 mr-8"}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendBotMessage} className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                placeholder="Ask a question..."
                value={botQuery}
                onChange={(e) => setBotQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button type="submit" className="p-2.5 bg-[#3826B1] hover:bg-purple-900 text-white rounded-xl cursor-pointer">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
