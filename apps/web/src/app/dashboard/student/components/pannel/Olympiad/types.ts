import React from "react";

export type FilterTab = "all" | "upcoming" | "ongoing" | "completed";

export interface OlympiadExam {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  questions: number;
  marks?: number;
  scorePercentage?: number;
  status: "upcoming" | "ongoing" | "completed";
  countdownText: string;
  countdownSubtext: string;
  countdownColor: string;
  statusBg: string;
  statusColor: string;
  iconBg: string;
  icon: React.ReactNode;
}
