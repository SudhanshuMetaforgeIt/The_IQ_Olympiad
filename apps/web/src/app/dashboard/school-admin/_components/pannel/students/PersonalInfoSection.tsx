"use client";

import React, { useRef, useState } from "react";
import { Calendar, ChevronDown, User, Upload, Trash2 } from "lucide-react";
import { StudentFormData } from "./types";

interface PersonalInfoProps {
  formData: StudentFormData;
  handleChange: (field: keyof StudentFormData, value: string) => void;
}

export function PersonalInfoSection({ formData, handleChange }: PersonalInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        handleChange("photoUrl" as keyof StudentFormData, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    handleChange("photoUrl" as keyof StudentFormData, "");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 font-sans">
      <h2 className="text-xl font-bold text-[#1E1B4B]">Personal Information</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Student Name <span className="text-purple-600">*</span></label>
            <input type="text" placeholder="Enter full name" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-3">Gender <span className="text-purple-600">*</span></label>
            <div className="flex items-center space-x-6 pt-1">
              <label className="inline-flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700">
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={(e) => handleChange("gender", e.target.value)} className="w-4 h-4 text-purple-600 border-slate-300" />
                <span>Male</span>
              </label>
              <label className="inline-flex items-center space-x-2 cursor-pointer text-sm font-medium text-slate-700">
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={(e) => handleChange("gender", e.target.value)} className="w-4 h-4 text-purple-600 border-slate-300" />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Date of Birth <span className="text-purple-600">*</span></label>
            <div className="relative">
              <input type="text" placeholder="dd/mm/yyyy" value={formData.dob} onChange={(e) => handleChange("dob", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 pr-10" required />
              <Calendar className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Admission No. <span className="text-purple-600">*</span></label>
            <input type="text" placeholder="Enter admission number" value={formData.admissionNo} onChange={(e) => handleChange("admissionNo", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Roll Number <span className="text-purple-600">*</span></label>
            <input type="text" placeholder="Enter roll number" value={formData.rollNumber} onChange={(e) => handleChange("rollNumber", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">Blood Group</label>
            <div className="relative">
              <select value={formData.bloodGroup} onChange={(e) => handleChange("bloodGroup", e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 appearance-none focus:outline-none cursor-pointer">
                <option value="">Select blood group</option>
                <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,image/jpg" className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-6 bg-purple-50/60 rounded-3xl border-2 border-dashed border-purple-300 hover:border-purple-500 text-center space-y-3 cursor-pointer hover:bg-purple-100/50 transition-all min-h-[210px] relative group">
            {photoPreview ? (
              <div className="relative flex flex-col items-center space-y-2">
                <img src={photoPreview} alt="Student Uploaded Photo" className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-400 shadow-md" />
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-xs font-bold text-purple-700 hover:underline">Change Photo</span>
                  <button type="button" onClick={removePhoto} className="p-1 text-red-500 hover:text-red-700 bg-white rounded-full border border-slate-200 shadow-xs" title="Remove Photo">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-purple-200/60 text-purple-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform"><User className="w-8 h-8" /></div>
                <div>
                  <p className="text-sm font-bold text-purple-900 flex items-center justify-center gap-1.5"><Upload className="w-4 h-4" /><span>Upload Photo</span></p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG (Max 2MB)</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
