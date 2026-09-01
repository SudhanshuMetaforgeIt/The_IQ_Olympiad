"use client";

import { ArrowLeft, Calendar, ChevronDown, User } from "lucide-react";
import { SectionProps } from "./types";

export function PersonalInfoSection({ formData, handleChange, onCancel }: SectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-bold text-[#1E1B4B]">Personal Information</h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
            title="Back to Students"
            aria-label="Back to Students"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (9 Cols) */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Student Name */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">
              Student Name <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-3">
              Gender <span className="text-purple-600">*</span>
            </label>
            <div className="flex items-center space-x-6 pt-1">
              <label className="inline-flex items-center space-x-2 cursor-pointer text-body font-medium text-slate-700">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <span>Male</span>
              </label>
              <label className="inline-flex items-center space-x-2 cursor-pointer text-body font-medium text-slate-700">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">
              Date of Birth <span className="text-purple-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all pr-10"
                required
              />
              <Calendar className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Admission No */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">
              Admission No. <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter admission number"
              value={formData.admissionNo}
              onChange={(e) => handleChange("admissionNo", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">
              Roll Number <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter roll number"
              value={formData.rollNumber}
              onChange={(e) => handleChange("rollNumber", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">Blood Group</label>
            <div className="relative">
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">Aadhar Number</label>
            <input
              type="text"
              placeholder="Enter Aadhar number"
              value={formData.aadharNumber}
              onChange={(e) => handleChange("aadharNumber", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">
              Phone Number <span className="text-purple-600">*</span>
            </label>
            <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500">
              <div className="bg-slate-50 px-3 py-2.5 border-r border-slate-200 flex items-center space-x-1.5 text-body font-bold text-slate-700 shrink-0">
                <span>🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-white px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-label font-bold text-slate-800 mb-2">Email ID</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-body text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Right Photo Upload Box (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 bg-purple-50/60 rounded-3xl border border-dashed border-purple-200 text-center space-y-3 cursor-pointer hover:bg-purple-50 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-purple-200/60 text-purple-700 flex items-center justify-center shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <div>
            <p className="text-body font-bold text-purple-900">Upload Photo</p>
            <p className="text-caption text-slate-400 mt-1">JPG, PNG (Max 2MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
