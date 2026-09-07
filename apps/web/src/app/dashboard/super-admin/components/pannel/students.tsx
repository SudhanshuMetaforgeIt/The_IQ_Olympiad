"use client";

import React, { useState } from "react";
import { StudentsHeader } from "./students/StudentsHeader";
import { StudentsStatCards } from "./students/StudentsStatCards";
import { StudentsFilterBar } from "./students/StudentsFilterBar";
import { StudentsTable } from "./students/StudentsTable";
import { StudentsPagination } from "./students/StudentsPagination";
import { AddStudentForm } from "./students/AddStudentForm";

interface StudentsPanelProps {
  initialCard?: string | null;
}

export default function StudentsPanel({ initialCard = "total" }: StudentsPanelProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(initialCard);
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialCard !== undefined) {
      setSelectedCard(initialCard);
    }
  }, [initialCard]);

  const handleSelectCard = (id: string | null) => {
    setSelectedCard(id);
  };

  const handleClearCardFilter = () => {
    setSelectedCard(null);
  };

  const handleSaveStudent = (newStudent: any) => {
    setIsAddingStudent(false);
  };

  if (isAddingStudent) {
    return (
      <AddStudentForm
        onBack={() => setIsAddingStudent(false)}
        onSave={handleSaveStudent}
      />
    );
  }

  return (
    <div className="space-y-6 pb-8 font-sans">
      <StudentsHeader />
      <StudentsStatCards
        selectedCard={selectedCard}
        onSelectCard={handleSelectCard}
      />
      <StudentsFilterBar
        selectedCard={selectedCard}
        onSelectCard={handleSelectCard}
        onClearCardFilter={handleClearCardFilter}
        onAddStudentClick={() => setIsAddingStudent(true)}
      />
      <StudentsTable selectedCard={selectedCard} />
      <StudentsPagination selectedCard={selectedCard} />
    </div>
  );
}
