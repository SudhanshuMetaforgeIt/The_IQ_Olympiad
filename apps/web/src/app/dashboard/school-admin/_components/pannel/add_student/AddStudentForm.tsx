"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { StudentFormData, AddStudentFormProps } from "./types";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { AcademicInfoSection } from "./AcademicInfoSection";
import { GuardianInfoSection } from "./GuardianInfoSection";
import { AdditionalInfoSection } from "./AdditionalInfoSection";

export function AddStudentForm({ onCancel, onSave }: AddStudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    studentName: "",
    gender: "Male",
    dob: "",
    admissionNo: "",
    rollNumber: "",
    bloodGroup: "",
    aadharNumber: "",
    phone: "",
    email: "",
    className: "",
    section: "",
    academicYear: "",
    guardianName: "",
    relationship: "",
    guardianPhone: "",
    guardianEmail: "",
    address: "",
    previousSchool: "",
    transportRequired: "",
    medicalCondition: "",
  });

  const handleChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="w-full font-sans text-slate-900 pb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoSection formData={formData} handleChange={handleChange} onCancel={onCancel} />
        <AcademicInfoSection formData={formData} handleChange={handleChange} />
        <GuardianInfoSection formData={formData} handleChange={handleChange} />
        <AdditionalInfoSection formData={formData} handleChange={handleChange} />

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-button rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-[#6B46C1] hover:bg-purple-800 text-white font-bold text-button rounded-full shadow-md shadow-purple-600/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Student</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
