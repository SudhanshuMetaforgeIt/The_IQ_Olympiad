"use client";

import React, { useState, useMemo } from "react";
import OlympiadsHero from "./components/OlympiadsHero";
import OlympiadsFilterBar from "./components/OlympiadsFilterBar";
import OlympiadCard from "./components/OlympiadCard";
import WhyParticipateSection from "./components/WhyParticipateSection";
import { OLYMPIADS_DATA } from "./components/olympiadsData";
import { OlympiadStatus, SubjectCategory } from "./components/types";
import { Sparkles, RotateCcw } from "lucide-react";

export default function OlympiadsPage() {
  const [selectedClass, setSelectedClass] = useState<string>("All Classes");
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectCategory>("All Subjects");
  const [selectedStatus, setSelectedStatus] =
    useState<OlympiadStatus>("Upcoming");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOlympiadId, setSelectedOlympiadId] =
    useState<string>("intelliquest-2026");

  const filteredOlympiads = useMemo(() => {
    return OLYMPIADS_DATA.filter((item) => {
      // 1. Status filter
      if (item.status !== selectedStatus) {
        return false;
      }

      // 2. Class filter (individual class 7 to 12 matching)
      if (selectedClass !== "All Classes") {
        const gradeMatch = selectedClass.match(/\d+/);
        if (gradeMatch) {
          const selectedGrade = parseInt(gradeMatch[0], 10);
          const rangeMatch = item.eligibility.match(/(\d+)\s*[-–]\s*(\d+)/);
          if (rangeMatch) {
            const minGrade = parseInt(rangeMatch[1], 10);
            const maxGrade = parseInt(rangeMatch[2], 10);
            if (selectedGrade < minGrade || selectedGrade > maxGrade) {
              return false;
            }
          } else if (!item.eligibility.includes(gradeMatch[0])) {
            return false;
          }
        }
      }

      // 3. Subject filter
      if (selectedSubject !== "All Subjects") {
        const matchesPrimary = item.primarySubject === selectedSubject;
        const matchesTags = item.subjects.includes(selectedSubject);
        const isFlagship = item.isFlagship;
        if (!matchesPrimary && !matchesTags && !isFlagship) {
          return false;
        }
      }

      // 4. Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSubjects = item.subjects.some((s) =>
          s.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesSubjects) {
          return false;
        }
      }

      return true;
    });
  }, [selectedClass, selectedSubject, selectedStatus, searchQuery]);

  // Keep first container highlighted by default in upcoming, live, and completed,
  // and update highlight when any card is clicked
  const activeSelectedId = useMemo(() => {
    if (
      selectedOlympiadId &&
      filteredOlympiads.some((item) => item.id === selectedOlympiadId)
    ) {
      return selectedOlympiadId;
    }
    return filteredOlympiads[0]?.id || "";
  }, [filteredOlympiads, selectedOlympiadId]);

  const handleStatusChange = (status: OlympiadStatus) => {
    setSelectedStatus(status);
    setSelectedOlympiadId("");
  };

  const handleResetFilters = () => {
    setSelectedClass("All Classes");
    setSelectedSubject("All Subjects");
    setSelectedStatus("Upcoming");
    setSearchQuery("");
    setSelectedOlympiadId("");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.05),transparent_70%)] bg-[#fafbfc] text-slate-900 font-sans">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-8">
        {/* Hero Banner Section */}
        <OlympiadsHero />

        {/* Dynamic Filter & Search Toolbar */}
        <OlympiadsFilterBar
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results Count & Quick Reset Bar */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-xs font-bold text-slate-500">
            Showing{" "}
            <span className="font-extrabold text-slate-900">
              {filteredOlympiads.length}
            </span>{" "}
            {filteredOlympiads.length === 1 ? "Olympiad" : "Olympiads"}
          </p>
          {(selectedClass !== "All Classes" ||
            selectedSubject !== "All Subjects" ||
            selectedStatus !== "Upcoming" ||
            searchQuery.trim() !== "") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" /> Clear filters
              </button>
            )}
        </div>

        {/* Olympiads Cards Grid */}
        {filteredOlympiads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 xl:gap-8 items-stretch">
            {filteredOlympiads.map((olympiad) => (
              <OlympiadCard
                key={olympiad.id}
                olympiad={olympiad}
                isHighlighted={activeSelectedId === olympiad.id}
                onSelect={() => setSelectedOlympiadId(olympiad.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs my-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-4">
              <Sparkles className="size-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Olympiads Found
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              We couldn&apos;t find any competitions matching your current
              filter criteria. Try adjusting your search or resetting filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              Reset Filters
            </button>
          </div>
        )}

        {/* Value Proposition Highlights Banner */}
        <WhyParticipateSection />
      </div>
    </div>
  );
}