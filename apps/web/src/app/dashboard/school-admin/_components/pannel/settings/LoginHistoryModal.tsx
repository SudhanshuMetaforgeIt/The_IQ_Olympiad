"use client";

import React, { useState } from "react";
import { Clock, Monitor, Smartphone, Globe, X, Download, ShieldCheck, AlertCircle } from "lucide-react";

interface LoginHistoryItem {
  id: string;
  device: string;
  location: string;
  ip: string;
  time: string;
  status: "Success" | "Failed" | "Password Changed";
  isMobile: boolean;
}

const INITIAL_LOGIN_LOGS: LoginHistoryItem[] = [
  { id: "log-1", device: "Chrome 122 on Windows 11 (Current Session)", location: "Bangalore, India", ip: "182.73.189.42", time: "Today, 05:42 PM", status: "Success", isMobile: false },
  { id: "log-2", device: "Safari on iPhone 15 Pro", location: "Bangalore, India", ip: "49.37.112.5", time: "Today, 02:15 PM", status: "Success", isMobile: true },
  { id: "log-3", device: "Firefox on macOS Sonoma", location: "Mumbai, India", ip: "103.21.244.12", time: "Yesterday, 11:20 AM", status: "Password Changed", isMobile: false },
  { id: "log-4", device: "Chrome on Unknown Android", location: "New Delhi, India", ip: "115.240.92.18", time: "3 days ago, 09:10 PM", status: "Failed", isMobile: true },
  { id: "log-5", device: "Edge 121 on Windows 11", location: "Bangalore, India", ip: "182.73.189.42", time: "4 days ago, 04:30 PM", status: "Success", isMobile: false },
];

interface LoginHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginHistoryModal({ isOpen, onClose }: LoginHistoryModalProps) {
  const [logs] = useState<LoginHistoryItem[]>(INITIAL_LOGIN_LOGS);
  const [filter, setFilter] = useState<"all" | "success" | "failed">("all");

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    if (filter === "success") return log.status === "Success";
    if (filter === "failed") return log.status === "Failed";
    return true;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Device,Location,IP Address,Timestamp,Status"].concat(logs.map((l) => `"${l.device}","${l.location}","${l.ip}","${l.time}","${l.status}"`)).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Login_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Login History & Security Logs</h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">Monitor all recent account access events and IP activity.</p>
            </div>
          </div>
          <button type="button" onClick={handleExportCSV} className="hidden sm:flex px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl items-center gap-1.5 cursor-pointer shadow-2xs">
            <Download className="w-4 h-4 text-purple-600" />
            <span>Export Logs</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100/60 p-1.5 rounded-2xl w-fit">
          <button type="button" onClick={() => setFilter("all")} className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${filter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}>
            All Logs ({logs.length})
          </button>
          <button type="button" onClick={() => setFilter("success")} className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${filter === "success" ? "bg-white text-emerald-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}>
            Successful
          </button>
          <button type="button" onClick={() => setFilter("failed")} className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${filter === "failed" ? "bg-white text-rose-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}>
            Failed
          </button>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4 hover:border-purple-200 transition-colors">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-2xs">
                  {log.isMobile ? <Smartphone className="w-5 h-5 text-purple-600" /> : <Monitor className="w-5 h-5 text-[#6332ec]" />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{log.device}</h4>
                  <div className="flex items-center space-x-3 mt-1 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{log.location} ({log.ip})</span>
                    <span>•</span><span>{log.time}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shrink-0 flex items-center gap-1 ${log.status === "Success" ? "bg-emerald-100 text-emerald-800" : log.status === "Failed" ? "bg-rose-100 text-rose-700" : "bg-purple-100 text-purple-900"}`}>
                {log.status === "Success" && <ShieldCheck className="w-3.5 h-3.5" />}
                {log.status === "Failed" && <AlertCircle className="w-3.5 h-3.5" />}
                {log.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500">Showing last 5 login sessions</p>
          <button type="button" onClick={onClose} className="px-6 py-2.5 bg-[#6332ec] hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm rounded-full transition-all cursor-pointer">
            Close Logs
          </button>
        </div>
      </div>
    </div>
  );
}
