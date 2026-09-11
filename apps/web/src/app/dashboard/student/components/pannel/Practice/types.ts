import React from "react";

export interface PracticeSubject {
  id: string;
  title: string;
  description: string;
  topicsCount: number;
  questionsCount: number;
  testsInfo: string;
  avgScore: number;
  freeTestsUsed: number;
  totalFreeTests?: number;
  buttonClass: string;
  iconBgClass: string;
  iconColorClass: string;
  icon: React.ReactNode;
  watermarkGraphic: React.ReactNode;
}

export interface PracticeQuestion {
  id: number;
  text: string;
  options: {
    key: string;
    text: string;
  }[];
  correctKey: string;
  explanation: string;
}
