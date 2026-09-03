"use client";

import React from "react";
import { BookOpen, Calendar, Clock, ChevronDown } from "lucide-react";

interface BasicInformationSectionProps {
  formData: {
    examName: string;
    examCode: string;
    subject: string;
    examDate: string;
    duration: string;
    startTime: string;
    endTime: string;
    regStartDate: string;
    regEndDate: string;
    maxParticipants: string;
  };
  handleChange: (field: string, value: string) => void;
}

export function BasicInformationSection({ formData, handleChange }: BasicInformationSectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec]">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black text-slate-900">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Exam Name <span className="text-purple-600">*</span></label>
          <input type="text" required placeholder="Enter exam name" value={formData.examName} onChange={(e) => handleChange("examName", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Exam Code <span className="text-purple-600">*</span></label>
          <input type="text" required placeholder="Enter unique exam code" value={formData.examCode} onChange={(e) => handleChange("examCode", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Subject(s) <span className="text-purple-600">*</span></label>
          <div className="relative">
            <select value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
              <option value="">Select subjects</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Cyber / Computer Science">Cyber / Computer Science</option>
              <option value="English">English</option>
              <option value="General Knowledge">General Knowledge</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Exam Date <span className="text-purple-600">*</span></label>
          <div className="relative">
            <input type="text" placeholder="Select exam date" value={formData.examDate} onChange={(e) => handleChange("examDate", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 pr-10" />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Duration <span className="text-purple-600">*</span></label>
          <div className="relative">
            <select value={formData.duration} onChange={(e) => handleChange("duration", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 appearance-none focus:outline-none cursor-pointer">
              <option value="">Select duration</option>
              <option value="1 hr">1 hr (60 mins)</option>
              <option value="1.5 hrs">1.5 hrs (90 mins)</option>
              <option value="2 hrs">2 hrs (120 mins)</option>
              <option value="3 hrs">3 hrs (180 mins)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Schedule <span className="text-purple-600">*</span></label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input type="text" placeholder="Start Time" value={formData.startTime} onChange={(e) => handleChange("startTime", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 pr-8" />
              <Clock className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-slate-400 font-bold">-</span>
            <div className="relative flex-1">
              <input type="text" placeholder="End Time" value={formData.endTime} onChange={(e) => handleChange("endTime", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 pr-8" />
              <Clock className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Registration Start Date <span className="text-purple-600">*</span></label>
          <div className="relative">
            <input type="text" placeholder="Select start date" value={formData.regStartDate} onChange={(e) => handleChange("regStartDate", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 pr-10" />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-800 mb-2">Registration End Date <span className="text-purple-600">*</span></label>
          <div className="relative">
            <input type="text" placeholder="Select end date" value={formData.regEndDate} onChange={(e) => handleChange("regEndDate", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 pr-10" />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-800 mb-2">Registration Ends In</label>
          <input type="text" readOnly disabled value="—" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-800 mb-2">Max Participants <span className="text-purple-600">*</span></label>
          <input type="text" placeholder="Enter maximum capacity" value={formData.maxParticipants} onChange={(e) => handleChange("maxParticipants", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900" />
        </div>
      </div>
    </div>
  );
}
