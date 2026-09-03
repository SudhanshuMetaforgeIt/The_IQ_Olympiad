import type {
  StudentProfile,
  UpcomingExam,
  StatItem,
  ExamResultItem,
  PerformanceSubjectMetric,
  ExamTipItem,
  CertificateItem,
} from "../../types";

/** Neutral shell until real auth/profile API is wired into the dashboard. */
export const STUDENT_PROFILE: StudentProfile = {
  name: "Student",
  grade: "—",
  school: "—",
  avatarUrl: "",
  unreadNotifications: 0,
};

/** No upcoming exam until API provides one. */
export const UPCOMING_EXAM: UpcomingExam | null = null;

export const DASHBOARD_STATS: StatItem[] = [
  {
    id: "stat-registered",
    title: "Registered Exams",
    value: "—",
    subtext: "No data yet",
    iconType: "registered",
  },
  {
    id: "stat-completed",
    title: "Completed Exams",
    value: "—",
    subtext: "No data yet",
    iconType: "completed",
  },
  {
    id: "stat-rank",
    title: "Current Rank",
    value: "—",
    subtext: "No data yet",
    iconType: "rank",
  },
  {
    id: "stat-badges",
    title: "Badges Earned",
    value: "—",
    subtext: "No data yet",
    iconType: "badges",
  },
];

export const RECENT_RESULTS: ExamResultItem[] = [];

export const PERFORMANCE_METRICS: PerformanceSubjectMetric[] = [];

/** Static informational tip (not student-specific application data). */
export const EXAM_TIP: ExamTipItem = {
  id: "tip-1",
  title: "Exam Tips",
  content:
    "Read each question carefully, manage your time well and review your answers before submitting.",
};

export const MOCK_CERTIFICATES: CertificateItem[] = [];
