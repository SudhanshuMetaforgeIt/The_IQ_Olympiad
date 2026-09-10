import {
  RankSheetRecord,
  StudentTotalRecord,
  RegisteredStudentRecord,
  MeritListRecord,
  PublishedResultRecord,
  ResultsStatCardData,
} from "./types";

export const initialRankSheetData: RankSheetRecord[] = [
  { id: "1", rank: 1, studentName: "Aarav Sharma", avatarInitials: "AS", avatarBg: "bg-purple-100 text-purple-700", registrationId: "IQ01001", rollNo: "100104", schoolName: "Delhi Public School", schoolLocation: "New Delhi", classNum: "10", score: "91.5 / 100", percentage: "91.50%", status: "Qualified" },
  { id: "2", rank: 2, studentName: "Siya Nair", avatarInitials: "SN", avatarBg: "bg-purple-100 text-purple-700", registrationId: "IQ01002", rollNo: "100187", schoolName: "St. Xavier's School", schoolLocation: "Mumbai", classNum: "10", score: "85 / 100", percentage: "85.00%", status: "Qualified" },
  { id: "3", rank: 3, studentName: "Vivaan Patel", avatarInitials: "VP", avatarBg: "bg-purple-100 text-purple-700", registrationId: "IQ01003", rollNo: "100254", schoolName: "Kendriya Vidyalaya", schoolLocation: "Pune", classNum: "9", score: "78.5 / 100", percentage: "78.50%", status: "Qualified" },
];

export const allStudentsData: StudentTotalRecord[] = [
  { id: "1", sNo: 1, studentName: "Aarav Sharma", avatarInitials: "AS", registrationId: "IQ01001", rollNo: "100104", schoolName: "Delhi Public School", schoolLocation: "New Delhi", classNum: "10", olympiadsRegistered: 3, status: "Active" },
  { id: "2", sNo: 2, studentName: "Siya Nair", avatarInitials: "SN", registrationId: "IQ01002", rollNo: "100187", schoolName: "St. Xavier's School", schoolLocation: "Mumbai", classNum: "10", olympiadsRegistered: 2, status: "Active" },
  { id: "3", sNo: 3, studentName: "Vivaan Patel", avatarInitials: "VP", registrationId: "IQ01003", rollNo: "100254", schoolName: "Kendriya Vidyalaya", schoolLocation: "Pune", classNum: "9", olympiadsRegistered: 4, status: "Active" },
];

export const registeredStudentsData: RegisteredStudentRecord[] = [
  { id: "1", sNo: 1, studentName: "Aarav Sharma", avatarInitials: "AS", registrationId: "IQR10001", rollNo: "100104", schoolName: "Delhi Public School", schoolLocation: "New Delhi", classNum: "10", registeredOn: "10 May 2026", status: "Registered" },
  { id: "2", sNo: 2, studentName: "Siya Nair", avatarInitials: "SN", registrationId: "IQR10002", rollNo: "100187", schoolName: "St. Xavier's School", schoolLocation: "Mumbai", classNum: "10", registeredOn: "10 May 2026", status: "Registered" },
  { id: "3", sNo: 3, studentName: "Vivaan Patel", avatarInitials: "VP", registrationId: "IQR10003", rollNo: "100254", schoolName: "Kendriya Vidyalaya", schoolLocation: "Pune", classNum: "9", registeredOn: "09 May 2026", status: "Registered" },
];

export const meritListData: MeritListRecord[] = [
  { id: "1", rank: 1, studentName: "Aarav Sharma", avatarInitials: "AS", registrationId: "IQR10001", rollNo: "100104", schoolName: "Delhi Public School", schoolLocation: "New Delhi", classNum: "10", score: "98.50", percentage: "98.50%", medal: "Gold" },
  { id: "2", rank: 2, studentName: "Siya Nair", avatarInitials: "SN", registrationId: "IQR10002", rollNo: "100187", schoolName: "St. Xavier's School", schoolLocation: "Mumbai", classNum: "10", score: "96.20", percentage: "96.20%", medal: "Gold" },
  { id: "3", rank: 3, studentName: "Vivaan Patel", avatarInitials: "VP", registrationId: "IQR10003", rollNo: "100254", schoolName: "Kendriya Vidyalaya", schoolLocation: "Pune", classNum: "9", score: "94.80", percentage: "94.80%", medal: "Gold" },
];

export const publishedResultsData: PublishedResultRecord[] = [
  { id: "1", sNo: 1, olympiadName: "National Science Olympiad", examCode: "NSO-2025", classRange: "1 - 10", participatedStudents: 12845, publishedOn: "12 May 2026, 10:30 AM", publishedBy: "Super Admin", iconBg: "bg-purple-100/80", iconColor: "text-purple-600" },
  { id: "2", sNo: 2, olympiadName: "International Mathematics Olympiad", examCode: "IMO-2025", classRange: "1 - 10", participatedStudents: 11223, publishedOn: "10 May 2026, 09:15 AM", publishedBy: "Super Admin", iconBg: "bg-emerald-100/80", iconColor: "text-emerald-600" },
  { id: "3", sNo: 3, olympiadName: "English Language Olympiad", examCode: "ELO-2025", classRange: "1 - 10", participatedStudents: 8764, publishedOn: "08 May 2026, 11:45 AM", publishedBy: "Super Admin", iconBg: "bg-amber-100/80", iconColor: "text-amber-600" },
  { id: "4", sNo: 4, olympiadName: "Cyber Olympiad", examCode: "CO-2025", classRange: "6 - 10", participatedStudents: 6512, publishedOn: "07 May 2026, 02:20 PM", publishedBy: "Super Admin", iconBg: "bg-sky-100/80", iconColor: "text-sky-600" },
  { id: "5", sNo: 5, olympiadName: "Mental Ability Olympiad", examCode: "MAO-2025", classRange: "1 - 10", participatedStudents: 9145, publishedOn: "06 May 2026, 09:30 AM", publishedBy: "Super Admin", iconBg: "bg-pink-100/80", iconColor: "text-pink-600" },
  { id: "6", sNo: 6, olympiadName: "Green Earth Olympiad", examCode: "GEO-2025", classRange: "3 - 10", participatedStudents: 5876, publishedOn: "05 May 2026, 10:00 AM", publishedBy: "Super Admin", iconBg: "bg-teal-100/80", iconColor: "text-teal-600" },
  { id: "7", sNo: 7, olympiadName: "Sports Knowledge Olympiad", examCode: "SKO-2025", classRange: "1 - 10", participatedStudents: 7204, publishedOn: "04 May 2026, 12:10 PM", publishedBy: "Super Admin", iconBg: "bg-orange-100/80", iconColor: "text-orange-600" },
  { id: "8", sNo: 8, olympiadName: "Coding Olympiad", examCode: "COD-2025", classRange: "6 - 10", participatedStudents: 4321, publishedOn: "03 May 2026, 03:05 PM", publishedBy: "Super Admin", iconBg: "bg-indigo-100/80", iconColor: "text-indigo-600" },
  { id: "9", sNo: 9, olympiadName: "Social Studies Olympiad", examCode: "SSO-2025", classRange: "1 - 10", participatedStudents: 6987, publishedOn: "02 May 2026, 09:40 AM", publishedBy: "Super Admin", iconBg: "bg-violet-100/80", iconColor: "text-violet-600" },
];

export const resultsStatCardsData: ResultsStatCardData[] = [
  {
    id: "total",
    title: "Total Students",
    value: "35,217",
    subtitle: "Across all schools",
    iconBg: "bg-purple-100/80",
    iconColor: "text-purple-600",
    activeBorder: "border-2 border-purple-600 shadow-md ring-2 ring-purple-600/10",
    pointerColor: "border-t-purple-600",
  },
  {
    id: "registered",
    title: "Total Registered Students",
    value: "28,934",
    subtitle: "82.15% of total students",
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    activeBorder: "border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/10",
    pointerColor: "border-t-emerald-500",
  },
  {
    id: "merit",
    title: "Total Merit List",
    value: "1,256",
    subtitle: "Top performers",
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    activeBorder: "border-2 border-purple-600 shadow-md ring-2 ring-purple-600/10",
    pointerColor: "border-t-purple-600",
  },
  {
    id: "published",
    title: "Results Published",
    value: "24",
    subtitle: "Olympiads",
    iconBg: "bg-blue-100/80",
    iconColor: "text-blue-600",
    activeBorder: "border-2 border-purple-600 shadow-md ring-2 ring-purple-600/10",
    pointerColor: "border-t-purple-600",
  },
];
