"use client";

import React, { useState } from "react";
import { StudentsHeader } from "./students/StudentsHeader";
import { StudentsStatCards } from "./students/StudentsStatCards";
import { StudentsFilterBar } from "./students/StudentsFilterBar";
import { StudentsTable } from "./students/StudentsTable";
import { StudentsPagination } from "./students/StudentsPagination";

export default function StudentsPanel() {
  const [selectedCard, setSelectedCard] = useState<string | null>("inactive");

  const handleSelectCard = (id: string | null) => {
    setSelectedCard(id);
  };

  const handleClearCardFilter = () => {
    setSelectedCard(null);
  };

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
      />
      <StudentsTable selectedCard={selectedCard} />
      <StudentsPagination selectedCard={selectedCard} />
    </div>
  );
}
