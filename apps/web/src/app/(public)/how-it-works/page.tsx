"use client";

import React from "react";
import HowItWorksHero from "./HowItWorksHero";
import OlympiadJourneySteps from "./OlympiadJourneySteps";
import WhyChooseUsSection from "./WhyChooseUsSection";
import HowItWorksCta from "./HowItWorksCta";

export default function HowItWorksPage() {
  return (
    <div className="w-full bg-white pb-20 font-sans">
      <HowItWorksHero />
      <OlympiadJourneySteps />
      <WhyChooseUsSection />
      <HowItWorksCta />
    </div>
  );
}
