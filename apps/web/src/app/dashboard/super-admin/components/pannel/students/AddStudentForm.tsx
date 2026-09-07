"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Upload,
  User,
  Save,
} from "lucide-react";

interface AddStudentFormProps {
  onBack: () => void;
  onSave: (newStudent: any) => void;
}

export function AddStudentForm({ onBack, onSave }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "Male",
    dob: "",
    admissionNo: "",
    rollNumber: "",
    bloodGroup: "",
    className: "",
    section: "",
    academicYear: "",
    guardianName: "",
    relationship: "",
    countryCode: "IN +91",
    guardianPhone: "",
    guardianEmail: "",
    address: "",
    previousSchool: "",
    transportRequired: "",
    medicalCondition: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = formData.studentName
      ? formData.studentName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "ST";

    onSave({
      id: Date.now().toString(),
      sNo: Math.floor(10 + Math.random() * 90),
      initials: initials || "ST",
      name: formData.studentName || "New Student",
      regId: formData.admissionNo ? `REG${formData.admissionNo}` : "REG2025" + Math.floor(1000 + Math.random() * 9000),
      rollNo: formData.rollNumber ? `ROLL${formData.rollNumber}` : "ROLL" + Math.floor(1000 + Math.random() * 9000),
      className: formData.className || "Class 9",
      schoolName: "Greenfield Public School",
      olympiad: "Math Olympiad",
      registeredOn: "15 May 2025",
      avatarBg: "bg-purple-100 text-purple-700 font-bold",
    });
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-900">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6 relative">
          {/* Top Right Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2.5 rounded-full bg-slate-100/80 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs (9 Cols) */}
            <div className="lg:col-span-9 space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-center">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Student Name <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Gender <span className="text-purple-600">*</span>
                  </label>
                  <div className="flex items-center gap-6 py-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-bold text-slate-800">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-600 border-slate-300"
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-bold text-slate-800">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-600 border-slate-300"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Date of Birth <span className="text-purple-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="dd/mm/yyyy"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                    />
                    <Calendar className="w-4 h-4 text-purple-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Admission No. <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admission number"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Roll Number <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter roll number"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Blood Group
                  </label>
                  <div className="relative">
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Upload Photo Box (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-purple-200 bg-purple-50/20 rounded-3xl p-6 text-center group hover:bg-purple-50/50 transition-all cursor-pointer min-h-[190px] relative">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handlePhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Student Photo Preview"
                  className="w-20 h-20 object-cover rounded-2xl mb-2"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <User className="w-6 h-6 stroke-[2]" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-extrabold text-purple-700 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                JPG, PNG (Max 2MB)
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Academic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Class <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select class</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={`Class ${i + 1}`}>
                      Class {i + 1}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Section <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Academic Year <span className="text-purple-600">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select academic year</option>
                  <option value="2025 - 2026">2025 - 2026</option>
                  <option value="2024 - 2025">2024 - 2025</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Parent / Guardian Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Parent / Guardian Information
            </h2>
          </div>

          <div className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Guardian Name <span className="text-purple-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter guardian name"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Relationship <span className="text-purple-600">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                  >
                    <option value="">Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Relative">Relative</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Guardian Phone Number <span className="text-purple-600">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0 w-24">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-2.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="IN +91">IN +91</option>
                      <option value="US +1">US +1</option>
                      <option value="UK +44">UK +44</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="flex-1 bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Guardian Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Address <span className="text-purple-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Additional Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Additional Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Previous School
              </label>
              <input
                type="text"
                placeholder="Enter previous school name"
                value={formData.previousSchool}
                onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Transport Required
              </label>
              <div className="relative">
                <select
                  value={formData.transportRequired}
                  onChange={(e) => setFormData({ ...formData, transportRequired: e.target.value })}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all cursor-pointer"
                >
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Any Medical Condition
              </label>
              <input
                type="text"
                placeholder="Enter medical condition (if any)"
                value={formData.medicalCondition}
                onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-[#3B1EAE] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white font-extrabold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B1EAE] text-white font-extrabold text-xs sm:text-sm hover:bg-purple-800 transition-colors cursor-pointer shadow-md shadow-purple-600/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Student</span>
          </button>
        </div>
      </form>
    </div>
  );
}
