import type {
  StudentProfile,
  UpcomingExam,
  StatItem,
  ExamResultItem,
  PerformanceSubjectMetric,
  ExamTipItem,
  CertificateItem,
} from "../../types";

export const STUDENT_PROFILE: StudentProfile = {
  name: "Rahul Sharma",
  grade: "Class 8",
  school: "ABC Public School",
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
  unreadNotifications: 3,
};

export const UPCOMING_EXAM: UpcomingExam = {
  id: "sci-2026",
  title: "Science Olympiad 2026",
  date: "08 Sep 2026",
  time: "10:00 AM",
  durationMinutes: 50,
  totalQuestions: 50,
  // ISO date for live countdown component calculation (September 8, 2026)
  startTimeIso: "2026-09-08T10:00:00Z",
};

export const DASHBOARD_STATS: StatItem[] = [
  {
    id: "stat-registered",
    title: "Registered Exams",
    value: 4,
    subtext: "All Time",
    iconType: "registered",
  },
  {
    id: "stat-completed",
    title: "Completed Exams",
    value: 2,
    subtext: "All Time",
    iconType: "completed",
  },
  {
    id: "stat-rank",
    title: "Current Rank",
    value: 18,
    subtext: "School Rank",
    iconType: "rank",
  },
  {
    id: "stat-badges",
    title: "Badges Earned",
    value: 3,
    subtext: "All Time",
    iconType: "badges",
  },
];

export const RECENT_RESULTS: ExamResultItem[] = [
  {
    id: "res-sci-2025",
    title: "Science Olympiad 2025",
    completedDate: "Completed on 20 May 2025",
    rank: 12,
    badgeName: "Gold Medal",
    badgeVariant: "gold",
    scorePercentage: 86,
    subjectIcon: "science",
  },
  {
    id: "res-math-2025",
    title: "Mathematics Olympiad 2025",
    completedDate: "Completed on 15 Apr 2025",
    rank: 18,
    badgeName: "Silver Medal",
    badgeVariant: "silver",
    scorePercentage: 78,
    subjectIcon: "math",
  },
];

export const PERFORMANCE_METRICS: PerformanceSubjectMetric[] = [
  {
    id: "perf-sci",
    subject: "Science",
    percentage: 86,
    barColorClass: "bg-emerald-500",
  },
  {
    id: "perf-math",
    subject: "Mathematics",
    percentage: 78,
    barColorClass: "bg-indigo-600",
  },
  {
    id: "perf-eng",
    subject: "English",
    percentage: 82,
    barColorClass: "bg-amber-500",
  },
  {
    id: "perf-reasoning",
    subject: "Logical Reasoning",
    percentage: 74,
    barColorClass: "bg-blue-600",
  },
];

export const EXAM_TIP: ExamTipItem = {
  id: "tip-1",
  title: "Exam Tips",
  content: "Read each question carefully, manage your time well and review your answers before submitting.",
};

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-sci-2026",
    examTitle: "National Science Olympiad 2026",
    category: "Science & Innovation",
    issueDate: "28 Aug 2026",
    certificateId: "IQ-2026-NSO-88492",
    recipientName: "Rahul Sharma",
    grade: "Class 8",
    school: "ABC Public School",
    rank: 8,
    scorePercentage: 92,
    awardType: "gold",
    badgeTitle: "Gold Medal • National Rank #8",
    verificationCode: "VFY-88492-NSO",
    subjectIcon: "science",
  },
  {
    id: "cert-gk-2026",
    examTitle: "International GK Olympiad 2026",
    category: "General Knowledge & Current Affairs",
    issueDate: "20 Jul 2026",
    certificateId: "IQ-2026-IGK-99321",
    recipientName: "Rahul Sharma",
    grade: "Class 8",
    school: "ABC Public School",
    rank: 12,
    scorePercentage: 86,
    awardType: "gold",
    badgeTitle: "Certificate of Merit (Gold)",
    verificationCode: "VFY-99321-IGK",
    subjectIcon: "gk",
  },
  {
    id: "cert-math-2025",
    examTitle: "National Mathematics Olympiad 2025",
    category: "Mathematics & Analytical Logic",
    issueDate: "15 Apr 2025",
    certificateId: "IQ-2025-NMO-44120",
    recipientName: "Rahul Sharma",
    grade: "Class 7",
    school: "ABC Public School",
    rank: 18,
    scorePercentage: 78,
    awardType: "silver",
    badgeTitle: "Silver Medal • Certificate of Excellence",
    verificationCode: "VFY-44120-NMO",
    subjectIcon: "math",
  },
  {
    id: "cert-cyber-2025",
    examTitle: "National Cyber Olympiad 2025",
    category: "Computer Science & IT",
    issueDate: "10 Nov 2025",
    certificateId: "IQ-2025-NCO-12984",
    recipientName: "Rahul Sharma",
    grade: "Class 7",
    school: "ABC Public School",
    rank: 14,
    scorePercentage: 84,
    awardType: "silver",
    badgeTitle: "Certificate of Distinction",
    verificationCode: "VFY-12984-NCO",
    subjectIcon: "cyber",
  },
];
