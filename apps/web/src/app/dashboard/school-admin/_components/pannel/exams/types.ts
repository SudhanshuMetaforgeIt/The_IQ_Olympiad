export type ExamStatus = "Open" | "Upcoming" | "Completed";

export interface ExamRecord {
  id: string;
  examName: string;
  examCode: string;
  classes: string;
  examDate: string;
  schedule: string;
  duration: string;
  registrationEnds: string;
  daysLeft?: string;
  status: ExamStatus;
}

export interface CompletedExamRecord {
  id: string;
  badgeText: string;
  badgeBg: string;
  examName: string;
  subtitle: string;
  code: string;
  classes: string;
  category: string;
  categoryBg: string;
  examDate: string;
  schedule: string;
  duration: string;
  completedOn: string;
  totalParticipants: number;
  status: string;
}

export type ActiveCardType = "all" | "active" | "upcoming" | "completed";
