import { Users, UserCheck, UserX } from "lucide-react";

export const studentStatCardsData = [
  {
    id: "total",
    title: "Total Registered Students",
    value: "1,248",
    subtitle: "All time",
    icon: Users,
    iconBg: "bg-purple-100/70 text-purple-600",
    strokeColor: "#9333EA",
    percentage: null,
    activeBorder: "border-2 border-purple-600 shadow-sm",
  },
  {
    id: "active",
    title: "Active Students",
    value: "1,156",
    subtitle: "Active now",
    icon: UserCheck,
    iconBg: "bg-emerald-100/70 text-emerald-600",
    strokeColor: "#10B981",
    percentage: "92.6%",
    percentageColor: "bg-emerald-100 text-emerald-700 font-extrabold",
    activeBorder: "border-2 border-emerald-400 shadow-sm",
  },
  {
    id: "inactive",
    title: "Inactive Students",
    value: "92",
    subtitle: "Inactive",
    icon: UserX,
    iconBg: "bg-pink-100/70 text-pink-600",
    strokeColor: "#EF4444",
    percentage: "7.4%",
    percentageColor: "bg-red-100 text-red-600 font-extrabold",
    activeBorder: "border-2 border-red-500 shadow-sm",
  },
];

export interface StudentSchoolRecord {
  id: string;
  sNo: number;
  name: string;
  code: string;
  branch: string;
  location: string;
  avatarBg: string;
}

export const studentSchoolsListData: StudentSchoolRecord[] = [
  { id: "1", sNo: 1, name: "Greenfield Public School", code: "GPS123", branch: "Koramangala", location: "Bengaluru, Karnataka", avatarBg: "bg-purple-100 text-purple-600" },
  { id: "2", sNo: 2, name: "Sunrise International School", code: "SIS456", branch: "Andheri", location: "Mumbai, Maharashtra", avatarBg: "bg-blue-100 text-blue-600" },
  { id: "3", sNo: 3, name: "Bright Future Academy", code: "BFA789", branch: "Dwarka", location: "Delhi, Delhi", avatarBg: "bg-amber-100 text-amber-600" },
  { id: "4", sNo: 4, name: "Silver Oak School", code: "SOS321", branch: "Kothrud", location: "Pune, Maharashtra", avatarBg: "bg-emerald-100 text-emerald-600" },
  { id: "5", sNo: 5, name: "Blue Ridge School", code: "BRS654", branch: "Gachibowli", location: "Hyderabad, Telangana", avatarBg: "bg-pink-100 text-pink-600" },
  { id: "6", sNo: 6, name: "St. Mary's High School", code: "SMH5147", branch: "Salt Lake", location: "Kolkata, West Bengal", avatarBg: "bg-purple-100 text-purple-600" },
  { id: "7", sNo: 7, name: "Global Academy", code: "GA256", branch: "Satellite", location: "Ahmedabad, Gujarat", avatarBg: "bg-cyan-100 text-cyan-600" },
];

export interface RegisteredStudentDetail {
  id: string;
  sNo: number;
  initials: string;
  name: string;
  regId: string;
  rollNo: string;
  className: string;
  schoolName: string;
  olympiad: string;
  registeredOn: string;
  avatarBg: string;
}

export const activeStudentsListData: RegisteredStudentDetail[] = [
  { id: "1", sNo: 1, initials: "AS", name: "Ananya Sharma", regId: "REG20250006", rollNo: "ROLL1006", className: "Class 9", schoolName: "St. Mary's High School", olympiad: "Math Olympiad", registeredOn: "13 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "2", sNo: 2, initials: "AR", name: "Arjun Reddy", regId: "REG20250001", rollNo: "ROLL1001", className: "Class 10", schoolName: "Greenfield Public School", olympiad: "IMO 2025", registeredOn: "15 May 2025", avatarBg: "bg-blue-100 text-blue-700 font-bold" },
  { id: "3", sNo: 3, initials: "HS", name: "Harsh Shah", regId: "REG20250007", rollNo: "ROLL1007", className: "Class 8", schoolName: "Global Academy", olympiad: "IMO 2025", registeredOn: "12 May 2025", avatarBg: "bg-cyan-100 text-cyan-700 font-bold" },
  { id: "4", sNo: 4, initials: "NK", name: "Nikhil Kumar", regId: "REG20250003", rollNo: "ROLL1003", className: "Class 8", schoolName: "Bright Future Academy", olympiad: "Cyber Olympiad", registeredOn: "14 May 2025", avatarBg: "bg-emerald-100 text-emerald-700 font-bold" },
  { id: "5", sNo: 5, initials: "PD", name: "Priya Desai", regId: "REG20250002", rollNo: "ROLL1002", className: "Class 9", schoolName: "Sunrise International School", olympiad: "SOF Science", registeredOn: "15 May 2025", avatarBg: "bg-blue-100 text-blue-700 font-bold" },
  { id: "6", sNo: 6, initials: "SV", name: "Sneha Verma", regId: "REG20250004", rollNo: "ROLL1004", className: "Class 10", schoolName: "Silver Oak School", olympiad: "English Olympiad", registeredOn: "14 May 2025", avatarBg: "bg-emerald-100 text-emerald-700 font-bold" },
  { id: "7", sNo: 7, initials: "MR", name: "Manish Reddy", regId: "REG20250005", rollNo: "ROLL1005", className: "Class 7", schoolName: "Blue Ridge School", olympiad: "GK Olympiad", registeredOn: "13 May 2025", avatarBg: "bg-pink-100 text-pink-700 font-bold" },
  { id: "8", sNo: 8, initials: "AP", name: "Apoorva Patel", regId: "REG20250008", rollNo: "ROLL1008", className: "Class 9", schoolName: "Nexus International School", olympiad: "NSO 2025", registeredOn: "11 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "9", sNo: 9, initials: "RK", name: "Rohan Kumar", regId: "REG20250009", rollNo: "ROLL1009", className: "Class 8", schoolName: "Future Leaders School", olympiad: "Cyber Olympiad", registeredOn: "11 May 2025", avatarBg: "bg-cyan-100 text-cyan-700 font-bold" },
  { id: "10", sNo: 10, initials: "PT", name: "Pooja Tanwar", regId: "REG20250010", rollNo: "ROLL1010", className: "Class 10", schoolName: "Bright Future Academy", olympiad: "IMO 2025", registeredOn: "10 May 2025", avatarBg: "bg-blue-100 text-blue-700 font-bold" },
];

export const inactiveStudentsListData: RegisteredStudentDetail[] = [
  { id: "1", sNo: 1, initials: "AG", name: "Aarav Gupta", regId: "REG20250012", rollNo: "ROLL1012", className: "Class 9", schoolName: "Bright Future Academy", olympiad: "Cyber Olympiad", registeredOn: "10 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "2", sNo: 2, initials: "DV", name: "Disha Verma", regId: "REG20250021", rollNo: "ROLL1021", className: "Class 8", schoolName: "Global Academy", olympiad: "IMO 2025", registeredOn: "09 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "3", sNo: 3, initials: "IK", name: "Ishita Kapoor", regId: "REG20250027", rollNo: "ROLL1027", className: "Class 10", schoolName: "Silver Oak School", olympiad: "English Olympiad", registeredOn: "08 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "4", sNo: 4, initials: "KP", name: "Kunal Patel", regId: "REG20250033", rollNo: "ROLL1033", className: "Class 7", schoolName: "Blue Ridge School", olympiad: "GK Olympiad", registeredOn: "07 May 2025", avatarBg: "bg-pink-100 text-pink-700 font-bold" },
  { id: "5", sNo: 5, initials: "MP", name: "Meera Prasad", regId: "REG20250041", rollNo: "ROLL1041", className: "Class 9", schoolName: "Sunrise International School", olympiad: "SOF Science", registeredOn: "06 May 2025", avatarBg: "bg-pink-100 text-pink-700 font-bold" },
  { id: "6", sNo: 6, initials: "NS", name: "Neha Singh", regId: "REG20250048", rollNo: "ROLL1048", className: "Class 8", schoolName: "Greenfield Public School", olympiad: "Math Olympiad", registeredOn: "05 May 2025", avatarBg: "bg-cyan-100 text-cyan-700 font-bold" },
  { id: "7", sNo: 7, initials: "RV", name: "Rohan Verma", regId: "REG20250055", rollNo: "ROLL1055", className: "Class 10", schoolName: "St. Mary's High School", olympiad: "NSO 2025", registeredOn: "04 May 2025", avatarBg: "bg-emerald-100 text-emerald-700 font-bold" },
  { id: "8", sNo: 8, initials: "SA", name: "Sneha Agarwal", regId: "REG20250063", rollNo: "ROLL1063", className: "Class 9", schoolName: "Nexus International School", olympiad: "Cyber Olympiad", registeredOn: "03 May 2025", avatarBg: "bg-purple-100 text-purple-700 font-bold" },
  { id: "9", sNo: 9, initials: "TW", name: "Tanvi Waghmare", regId: "REG20250071", rollNo: "ROLL1071", className: "Class 8", schoolName: "Future Leaders School", olympiad: "English Olympiad", registeredOn: "02 May 2025", avatarBg: "bg-blue-100 text-blue-700 font-bold" },
];
