import {
  GraduationCap,
  Users,
  BookOpen,
  Radio,
  Calendar,
  Building2,
  FileText,
  MessageSquare,
  Award,
} from "lucide-react";

export const statCards = [
  { id: "schools", title: "Total Schools", value: "128", icon: GraduationCap, bg: "bg-purple-100/70", text: "text-purple-600", linkTab: "schools" },
  { id: "students", title: "Total Students", value: "12,845", icon: Users, bg: "bg-blue-100/70", text: "text-blue-600", linkTab: "students" },
  { id: "practice", title: "Practice Series", value: "8", icon: BookOpen, bg: "bg-purple-100/70", text: "text-purple-600", linkTab: "olympiads" },
  { id: "active-exams", title: "Active Exams (Live Now)", value: "6", icon: Radio, bg: "bg-pink-100/70", text: "text-pink-600", linkTab: "olympiads" },
  { id: "upcoming-exams", title: "Upcoming Exams", value: "18", icon: Calendar, bg: "bg-blue-100/70", text: "text-blue-600", linkTab: "olympiads" },
];

export const upcomingExamsOverviewData = [
  { id: 1, name: "IMO Round 2", olympiad: "IMO25", classLevel: "Class 8", date: "22 May 2025, 09:00 AM", registrations: "1,145" },
  { id: 2, name: "SOF English Level 1", olympiad: "ENG25", classLevel: "Class 9", date: "24 May 2025, 10:00 AM", registrations: "894" },
  { id: 3, name: "Cyber Olympiad 2025", olympiad: "CYBER25", classLevel: "Class 10", date: "26 May 2025, 11:00 AM", registrations: "756" },
  { id: 4, name: "GK Olympiad 2025", olympiad: "GKO25", classLevel: "Class 7", date: "28 May 2025, 02:00 PM", registrations: "612" },
  { id: 5, name: "NSO Level 1", olympiad: "NSO25", classLevel: "Class 8", date: "30 May 2025, 09:30 AM", registrations: "1,024" },
  { id: 6, name: "IEO Level 1", olympiad: "ENG25", classLevel: "Class 6", date: "02 Jun 2025, 10:00 AM", registrations: "698" },
];

export const activeExamsOverviewData = [
  { id: 1, name: "IMO Round 1", olympiad: "IMO25", classLevel: "Class 8", participants: "1,245", attempts: "980", participationRate: "78.71%", avgScore: "68.32%" },
  { id: 2, name: "SOF Science Level 1", olympiad: "NSO25", classLevel: "Class 9", participants: "962", attempts: "745", participationRate: "77.44%", avgScore: "66.18%" },
  { id: 3, name: "Cyber Olympiad 2025", olympiad: "CYBER25", classLevel: "Class 10", participants: "765", attempts: "612", participationRate: "80.00%", avgScore: "69.53%" },
  { id: 4, name: "English Olympiad 2025", olympiad: "ENG25", classLevel: "Class 6", participants: "632", attempts: "501", participationRate: "79.27%", avgScore: "67.21%" },
  { id: 5, name: "General Knowledge Olympiad", olympiad: "GKO25", classLevel: "Class 7", participants: "592", attempts: "468", participationRate: "79.05%", avgScore: "65.87%" },
  { id: 6, name: "Math Advance Round", olympiad: "MTH25", classLevel: "Class 9", participants: "512", attempts: "381", participationRate: "74.41%", avgScore: "64.29%" },
];

export const practiceSeriesData = [
  { id: 1, name: "NSO Level 1 Practice Series", olympiad: "NSO25", classLevel: "Class 8", participants: "2,456", attempts: "3,256", participationRate: "75.42%", avgScore: "68.21%" },
  { id: 2, name: "IMO Level 1 Practice Series", olympiad: "IMO25", classLevel: "Class 9", participants: "2,125", attempts: "2,845", participationRate: "74.71%", avgScore: "68.32%" },
  { id: 3, name: "Cyber Olympiad 2025", olympiad: "CYBER25", classLevel: "Class 10", participants: "1,872", attempts: "2,125", participationRate: "76.18%", avgScore: "64.87%" },
  { id: 4, name: "IEO Level 1 Practice Series", olympiad: "ENG25", classLevel: "Class 6", participants: "1,256", attempts: "1,504", participationRate: "73.45%", avgScore: "62.14%" },
  { id: 5, name: "AI Innovation Olympiad", olympiad: "AI25", classLevel: "Class 8", participants: "1,095", attempts: "1,298", participationRate: "72.36%", avgScore: "61.32%" },
  { id: 6, name: "Creative Arts Contest", olympiad: "ART25", classLevel: "Class 7", participants: "980", attempts: "1,240", participationRate: "70.42%", avgScore: "63.21%" },
  { id: 7, name: "GK Olympiad 2025", olympiad: "GKO25", classLevel: "Class 7", participants: "856", attempts: "1,020", participationRate: "69.11%", avgScore: "59.73%" },
  { id: 8, name: "Math Advance Challenge", olympiad: "MTH25", classLevel: "Class 9", participants: "765", attempts: "915", participationRate: "68.03%", avgScore: "58.21%" },
];

export const recentActivities = [
  { id: "1", title: "New School Registered", subtitle: "Greenfield Public School", time: "10 min ago", icon: Building2, bg: "bg-purple-100", text: "text-purple-600" },
  { id: "2", title: "Exam Started", subtitle: "IMO Round 1", time: "25 min ago", icon: FileText, bg: "bg-blue-100", text: "text-blue-600" },
  { id: "3", title: "New Student Registered", subtitle: "Arjun Mehta", time: "1 hr ago", icon: Users, bg: "bg-emerald-100", text: "text-emerald-600" },
  { id: "4", title: "Results Published", subtitle: "SOF Science Level 1", time: "2 hr ago", icon: MessageSquare, bg: "bg-pink-100", text: "text-pink-600" },
  { id: "5", title: "Certificate Generated", subtitle: "IMO Round 1", time: "3 hr ago", icon: Award, bg: "bg-blue-100", text: "text-blue-600" },
];

export const topSchools = [
  { rank: 1, name: "Greenfield Public School", students: "1,245", exams: "24" },
  { rank: 2, name: "Sunrise International School", students: "962", exams: "20" },
  { rank: 3, name: "Bright Future Academy", students: "876", exams: "18" },
  { rank: 4, name: "Silver Oak School", students: "743", exams: "15" },
  { rank: 5, name: "Blue Ridge School", students: "632", exams: "12" },
];

export const activeExamsList = [
  { rank: 1, name: "IMO Round 1", olympiad: "IMO25", students: "1,245", time: "15 May 2025, 09:00 AM", status: "Live" },
  { rank: 2, name: "SOF Science Level 1", olympiad: "NSO25", students: "962", time: "15 May 2025, 10:00 AM", status: "Live" },
  { rank: 3, name: "Cyber Olympiad 2025", olympiad: "CYBER25", students: "765", time: "15 May 2025, 11:00 AM", status: "Live" },
  { rank: 4, name: "English Olympiad 2025", olympiad: "ENG25", students: "632", time: "15 May 2025, 01:00 PM", status: "Live" },
  { rank: 5, name: "GK Olympiad 2025", olympiad: "GKO25", students: "592", time: "15 May 2025, 02:00 PM", status: "Live" },
];
