import React from "react";
import { getOlympiadDetailInfo } from "./data/olympiadDetailData";
import OlympiadDetailHero from "./components/OlympiadDetailHero";
import OlympiadAboutSection from "./components/OlympiadAboutSection";
import OlympiadSyllabusSection from "./components/OlympiadSyllabusSection";
import OlympiadDetailSidebar from "./components/OlympiadDetailSidebar";

interface PageProps {
  params: Promise<{ olympiadSlug: string }>;
}

export default async function OlympiadDetailsPage({ params }: PageProps) {
  const { olympiadSlug } = await params;
  const data = getOlympiadDetailInfo(olympiadSlug);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans py-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Top Hero Section */}
        <OlympiadDetailHero data={data} />

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: About and Syllabus */}
          <div className="lg:col-span-8">
            <OlympiadAboutSection data={data} />
            <OlympiadSyllabusSection data={data} />
          </div>

          {/* Right Column: Sidebar with Dates and Quick Facts */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <OlympiadDetailSidebar data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}