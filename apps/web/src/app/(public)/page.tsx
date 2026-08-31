import React from "react";
import HeroSection from "./_components/landing/HeroSection";
import HeroFeaturesGrid from "./_components/landing/HeroFeaturesGrid";
import ExploreSubjectsSection from "./_components/landing/ExploreSubjectsSection";
import ExploreClassesSection from "./_components/landing/ExploreClassesSection";
import HowItWorksSection from "./_components/landing/HowItWorksSection";
import OlympiadAndLeaderboardSection from "./_components/landing/OlympiadAndLeaderboardSection";
import AIPoweredLearningBanner from "./_components/landing/AIPoweredLearningBanner";
import CTASection from "./_components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Hero 5 Features Grid */}
      <HeroFeaturesGrid />

      {/* 3. Explore by Subject */}
      <ExploreSubjectsSection />

      {/* 4. Explore by Class */}
      <ExploreClassesSection />

      {/* 5. How THE IQ OLYMPIAD Works */}
      <HowItWorksSection />

      {/* 6. Upcoming Olympiads & Top Performers */}
      <OlympiadAndLeaderboardSection />

      {/* 7. Know What To Learn Next (AI Banner) */}
      <AIPoweredLearningBanner />

      {/* 8. CTA Journey Banner */}
      <CTASection />
    </div>
  );
}
