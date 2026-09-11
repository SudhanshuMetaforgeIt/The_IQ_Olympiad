export type RegistrationStatus = "Registered" | "Pending" | "Closed" | "Cancelled";

export interface ExamRegistrationRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  examName: string;
  schedule: string;
  registrationDate: string;
  status: RegistrationStatus;
  avatarBg: string;
  avatarUrl?: string;
}

export interface ClosedExamRecord {
  id: string;
  badgeText: string;
  badgeBg: string;
  examName: string;
  subtitle: string;
  code: string;
  classes: string;
  category: string;
  categoryBg: string;
  registrationPeriod: string;
  closedOn: string;
  totalRegistrations: number;
  status: string;
}

export type ActiveCardType = "all" | "pending" | "closed";
