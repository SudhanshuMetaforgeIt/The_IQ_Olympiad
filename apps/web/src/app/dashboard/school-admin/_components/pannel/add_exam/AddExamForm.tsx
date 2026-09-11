"use client";

import React, { useState } from "react";
import { ExamRecord } from "../exams/types";
import { BasicInformationSection } from "./BasicInformationSection";
import { ClassesSelectionSection } from "./ClassesSelectionSection";
import { AdditionalInformationSection } from "./AdditionalInformationSection";

interface AddExamFormProps {
  onCancel: () => void;
  onSave: (newExam: ExamRecord) => void;
}

export function AddExamForm({ onCancel, onSave }: AddExamFormProps) {
  const [formData, setFormData] = useState({
    examName: "",
    examCode: "",
    subject: "",
    examDate: "",
    duration: "",
    startTime: "",
    endTime: "",
    regStartDate: "",
    regEndDate: "",
    maxParticipants: "",
    examFee: "",
    lateFee: "",
    instructions: "",
    examPattern: "",
  });

  const [classSelectionType, setClassSelectionType] = useState<"all" | "custom">("custom");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSelectClass = (cls: string) => {
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== cls));
    } else {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.examName.trim() || !formData.examCode.trim()) return;

    const formattedClasses =
      classSelectionType === "all"
        ? "All Classes"
        : selectedClasses.length > 0
        ? selectedClasses.join(", ")
        : "Classes VII, VIII, IX, X, XI, XII";

    onSave({
      id: `exam-${Date.now()}`,
      examName: formData.examName.trim(),
      examCode: formData.examCode.trim().toUpperCase(),
      classes: formattedClasses,
      examDate: formData.examDate || "18 Sep 2026",
      schedule: formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : "09:00 AM - 11:00 AM",
      duration: formData.duration || "2 hrs",
      registrationEnds: formData.regEndDate || "10 Sep 2026",
      daysLeft: "15 days left",
      status: "Open",
    });
    onCancel();
  };

  return (
    <div className="w-full font-sans text-slate-900 pb-12 animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* 3 Main Sections */}
        <BasicInformationSection formData={formData} handleChange={handleChange} />
        <ClassesSelectionSection
          classSelectionType={classSelectionType}
          setClassSelectionType={setClassSelectionType}
          selectedClasses={selectedClasses}
          toggleSelectClass={toggleSelectClass}
        />
        <AdditionalInformationSection formData={formData} handleChange={handleChange} />

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-sm rounded-full transition-colors cursor-pointer shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#6332ec] hover:bg-purple-800 text-white font-black text-sm rounded-full shadow-md shadow-purple-600/20 transition-all cursor-pointer"
          >
            Save Exam
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExamForm;
