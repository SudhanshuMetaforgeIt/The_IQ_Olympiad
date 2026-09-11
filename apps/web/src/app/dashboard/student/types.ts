export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export interface UpcomingExam {
  id: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  totalQuestions: number;
  startTimeIso: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtext: string;
  iconType: "registered" | "completed" | "rank" | "badges";
}

export interface ExamResultItem {
  id: string;
  title: string;
  completedDate: string;
  rank: number;
  badgeName: string;
  badgeVariant: "gold" | "silver" | "bronze";
  scorePercentage: number;
  subjectIcon: "science" | "math" | "english" | "reasoning";
}

export interface PerformanceSubjectMetric {
  id: string;
  subject: string;
  percentage: number;
  barColorClass: string;
}

export interface ExamTipItem {
  id: string;
  title: string;
  content: string;
}

export interface CertificateItem {
  id: string;
  examTitle: string;
  category: string;
  issueDate: string;
  certificateId: string;
  recipientName: string;
  grade: string;
  school: string;
  rank: number;
  scorePercentage: number;
  awardType: "gold" | "silver" | "bronze" | "merit" | "participation";
  badgeTitle: string;
  verificationCode: string;
  subjectIcon: "science" | "math" | "english" | "gk" | "cyber";
}
