"use client";

import React, { useState } from "react";
import { OlympiadsHeroBanner } from "./olympiads/OlympiadsHeroBanner";
import { OlympiadsStatCards } from "./olympiads/OlympiadsStatCards";
import { OlympiadsFilterBar } from "./olympiads/OlympiadsFilterBar";
import { OlympiadsTable } from "./olympiads/OlympiadsTable";
import { OlympiadsPagination } from "./olympiads/OlympiadsPagination";
import { CreateOlympiadModal } from "./olympiads/CreateOlympiadModal";
import { OlympiadDetailsModal } from "./olympiads/OlympiadDetailsModal";
import { initialOlympiadsData } from "./olympiads/mockData";
import { OlympiadItem } from "./olympiads/types";

interface OlympiadsPanelProps {
  initialFilter?: string;
}

export default function OlympiadsPanel({ initialFilter = "all" }: OlympiadsPanelProps) {
  const [olympiadsList, setOlympiadsList] = useState<OlympiadItem[]>(initialOlympiadsData);
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingOlympiad, setEditingOlympiad] = useState<OlympiadItem | null>(null);
  const [viewingOlympiad, setViewingOlympiad] = useState<OlympiadItem | null>(null);

  React.useEffect(() => {
    if (initialFilter) {
      setSelectedFilter(initialFilter);
    }
  }, [initialFilter]);

  const ITEMS_PER_PAGE = 8;

  // Toggle active/inactive status
  const handleToggleStatus = (id: string) => {
    setOlympiadsList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Active" ? "Upcoming" : "Active";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Filter list by status & search query
  const filteredOlympiads = olympiadsList.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" ? true : item.status === selectedFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredOlympiads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOlympiads = filteredOlympiads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Save new or updated Olympiad
  const handleSaveOlympiad = (
    data: Omit<OlympiadItem, "id" | "registrations">
  ) => {
    if (editingOlympiad) {
      setOlympiadsList((prev) =>
        prev.map((item) =>
          item.id === editingOlympiad.id ? { ...item, ...data } : item
        )
      );
    } else {
      const newItem: OlympiadItem = {
        ...data,
        id: Date.now().toString(),
        registrations: 0,
      };
      setOlympiadsList((prev) => [newItem, ...prev]);
    }
  };

  // Delete Olympiad
  const handleDeleteOlympiad = (id: string) => {
    setOlympiadsList((prev) => prev.filter((item) => item.id !== id));
  };

  // Export handler
  const handleExport = () => {
    const jsonStr = JSON.stringify(filteredOlympiads, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "olympiads_export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-8 font-sans text-slate-900">
      {/* 1. Hero Banner */}
      <OlympiadsHeroBanner
        onCreateClick={() => {
          setEditingOlympiad(null);
          setIsModalOpen(true);
        }}
      />

      {/* 2. Stat Cards Grid */}
      <OlympiadsStatCards
        selectedFilter={selectedFilter}
        onSelectFilter={(filterId) => {
          setSelectedFilter((prev) => (prev === filterId ? "all" : filterId));
          setCurrentPage(1);
        }}
      />

      {/* 3. Search & Export Bar with Status Pill */}
      <OlympiadsFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedFilter={selectedFilter}
        onClearFilter={() => {
          setSelectedFilter("all");
          setSearchQuery("");
          setCurrentPage(1);
        }}
        onExport={handleExport}
      />

      {/* 4. Main Olympiads Table */}
      <OlympiadsTable
        olympiads={paginatedOlympiads}
        isUpcomingView={selectedFilter === "Upcoming"}
        isCompletedView={selectedFilter === "Completed"}
        onToggleStatus={handleToggleStatus}
        onEdit={(item) => {
          setEditingOlympiad(item);
          setIsModalOpen(true);
        }}
        onView={(item) => setViewingOlympiad(item)}
        onDelete={handleDeleteOlympiad}
      />

      {/* 5. Pagination */}
      <OlympiadsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        showingFrom={totalItems > 0 ? startIndex + 1 : 0}
        showingTo={Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}
        totalItems={totalItems}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 6. Create / Edit Modal */}
      <CreateOlympiadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOlympiad(null);
        }}
        onSave={handleSaveOlympiad}
        editingOlympiad={editingOlympiad}
      />

      {/* 7. View Details Modal */}
      <OlympiadDetailsModal
        olympiad={viewingOlympiad}
        onClose={() => setViewingOlympiad(null)}
      />
    </div>
  );
}
