"use client";

import { useState } from "react";
import { StudentRecord, ActiveCardType } from "./types";
import { initialTotalStudentsList, initialRegisteredStudentsList } from "./mockData";
import { StudentStatsCards } from "./StudentStatsCards";
import { StudentFilterBar } from "./StudentFilterBar";
import { StudentTable } from "./StudentTable";
import { AddStudentForm } from "./AddStudentForm";

export function StudentsPanel() {
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [activeCard, setActiveCard] = useState<ActiveCardType>("total");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalStudentsList, setTotalStudentsList] = useState<StudentRecord[]>(initialTotalStudentsList);
  const [registeredStudentsList, setRegisteredStudentsList] = useState<StudentRecord[]>(initialRegisteredStudentsList);

  const handleSaveStudent = (formData: any) => {
    const newStudent: StudentRecord = {
      id: Date.now().toString(),
      name: formData.studentName || "New Student",
      admissionNo: formData.admissionNo || `GVPS/2025/${Math.floor(1000 + Math.random() * 9000)}`,
      rollNumber: formData.rollNumber || "15",
      className: formData.className || "IX",
      section: formData.section || "A",
      phone: formData.phone || "9876543299",
      email: formData.email || "new.student@gvps.edu.in",
      status: "Active",
      avatarBg: "bg-[#E8F0FE] text-[#1A73E8]",
      initials: formData.studentName ? formData.studentName.slice(0, 2).toUpperCase() : "NS",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      isRegistered: true,
    };

    setTotalStudentsList((prev) => [newStudent, ...prev]);
    setRegisteredStudentsList((prev) => [newStudent, ...prev]);
    setIsAddingStudent(false);
  };

  if (isAddingStudent) {
    return (
      <AddStudentForm
        onCancel={() => setIsAddingStudent(false)}
        onSave={handleSaveStudent}
      />
    );
  }

  const currentDataset = activeCard === "registered" ? registeredStudentsList : totalStudentsList;

  const filteredStudents = currentDataset.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.includes(searchTerm);

    const matchesClass = selectedClass === "All Classes" || student.className === selectedClass;
    const matchesSection = selectedSection === "All Sections" || student.section === selectedSection;

    return matchesSearch && matchesClass && matchesSection;
  });

  return (
    <div className="space-y-6 w-full font-sans text-slate-900">
      <StudentStatsCards
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        totalCount={totalStudentsList.length}
        registeredCount={registeredStudentsList.length}
      />

      <StudentFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        onAddStudent={() => setIsAddingStudent(true)}
      />

      <StudentTable
        students={filteredStudents}
        activeCard={activeCard}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default StudentsPanel;
