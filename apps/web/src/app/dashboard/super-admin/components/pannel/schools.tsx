"use client";

import React, { useState } from "react";
import { SchoolsHeader } from "./schools/SchoolsHeader";
import { SchoolsStatCards } from "./schools/SchoolsStatCards";
import { SchoolsFilterBar } from "./schools/SchoolsFilterBar";
import { SchoolsTable } from "./schools/SchoolsTable";
import { SchoolsPagination } from "./schools/SchoolsPagination";
import { allSchoolsListData } from "./schools/mockData";

export default function SchoolsPanel() {
  const [selectedFilter, setSelectedFilter] = useState<string>("Active");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSchools = allSchoolsListData.filter((school) => {
    const matchesFilter =
      selectedFilter === "all" ? true : school.status === selectedFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      school.name.toLowerCase().includes(q) ||
      school.code.toLowerCase().includes(q) ||
      school.admin.toLowerCase().includes(q) ||
      school.email.toLowerCase().includes(q) ||
      school.location.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8 font-sans">
      <SchoolsHeader />
      <SchoolsStatCards
        selectedFilter={selectedFilter}
        onSelectFilter={(id) => setSelectedFilter(id)}
      />
      <SchoolsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onClearFilter={() => {
          setSelectedFilter("all");
          setSearchQuery("");
        }}
      />
      <SchoolsTable schools={filteredSchools} />
      <SchoolsPagination
        count={filteredSchools.length}
        total={filteredSchools.length}
        filterLabel={selectedFilter}
      />
    </div>
  );
}
