import { Building2, Users, Ban, Hourglass } from "lucide-react";

export const schoolsStatCardsData = [
  {
    id: "all",
    title: "Total Schools",
    value: "7",
    subtitle: "All registered schools",
    subtitleColor: "text-slate-400 font-semibold",
    icon: Building2,
    bg: "bg-purple-100/70",
    text: "text-purple-600",
    borderColor: "border-2 border-purple-500 shadow-sm",
  },
  {
    id: "Active",
    title: "Active Schools",
    value: "5",
    subtitle: "71.4% of total",
    subtitleColor: "text-emerald-600 font-bold",
    icon: Users,
    bg: "bg-emerald-100/70",
    text: "text-emerald-600",
    borderColor: "border-2 border-emerald-400 shadow-sm",
  },
  {
    id: "Inactive",
    title: "Inactive Schools",
    value: "1",
    subtitle: "14.3% of total",
    subtitleColor: "text-red-500 font-bold",
    icon: Ban,
    bg: "bg-red-100/70",
    text: "text-red-500",
    borderColor: "border-2 border-red-400 shadow-sm",
  },
  {
    id: "Pending",
    title: "Pending Schools",
    value: "1",
    subtitle: "14.3% of total",
    subtitleColor: "text-amber-500 font-bold",
    icon: Hourglass,
    bg: "bg-amber-100/70",
    text: "text-amber-500",
    borderColor: "border-2 border-amber-400 shadow-sm",
  },
];

export interface SchoolRecord {
  id: string;
  num: number;
  name: string;
  code: string;
  admin: string;
  email: string;
  phone: string;
  location: string;
  branch: string;
  students: string;
  exams: string;
  status: "Active" | "Inactive" | "Pending";
  avatarBg: string;
}

export const allSchoolsListData: SchoolRecord[] = [
  {
    id: "1",
    num: 1,
    name: "Greenfield Public School",
    code: "GPS123",
    admin: "Rohit Sharma",
    email: "rohit@gps.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    branch: "Koramangala",
    students: "1,245",
    exams: "24",
    status: "Active",
    avatarBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "2",
    num: 2,
    name: "Sunrise International School",
    code: "SIS456",
    admin: "Priya Patel",
    email: "priya@sis.com",
    phone: "+91 91234 56789",
    location: "Mumbai, Maharashtra",
    branch: "Andheri",
    students: "962",
    exams: "20",
    status: "Active",
    avatarBg: "bg-blue-100 text-blue-700",
  },
  {
    id: "3",
    num: 3,
    name: "Bright Future Academy",
    code: "BFA789",
    admin: "Anil Kumar",
    email: "anil@bfa.edu",
    phone: "+91 99876 54321",
    location: "Delhi, Delhi",
    branch: "Dwarka",
    students: "876",
    exams: "18",
    status: "Active",
    avatarBg: "bg-amber-100 text-amber-700",
  },
  {
    id: "4",
    num: 4,
    name: "Silver Oak School",
    code: "SOS321",
    admin: "Neha Verma",
    email: "neha@sos.edu",
    phone: "+91 95432 11111",
    location: "Pune, Maharashtra",
    branch: "Kothrud",
    students: "743",
    exams: "15",
    status: "Active",
    avatarBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "5",
    num: 5,
    name: "Blue Ridge School",
    code: "BRS654",
    admin: "Vikram Reddy",
    email: "vikram@brs.edu",
    phone: "+91 90000 11223",
    location: "Hyderabad, Telangana",
    branch: "Gachibowli",
    students: "632",
    exams: "12",
    status: "Pending",
    avatarBg: "bg-pink-100 text-pink-700",
  },
  {
    id: "6",
    num: 6,
    name: "St. Mary's High School",
    code: "SMHS147",
    admin: "Joseph D'Souza",
    email: "joseph@smhs.edu",
    phone: "+91 98711 22334",
    location: "Kolkata, West Bengal",
    branch: "Salt Lake",
    students: "850",
    exams: "14",
    status: "Inactive",
    avatarBg: "bg-purple-100 text-purple-700",
  },
  {
    id: "7",
    num: 7,
    name: "Global Academy",
    code: "GA258",
    admin: "Harsh Shah",
    email: "harsh@ga.edu",
    phone: "+91 93344 55867",
    location: "Ahmedabad, Gujarat",
    branch: "Satellite",
    students: "512",
    exams: "9",
    status: "Active",
    avatarBg: "bg-cyan-100 text-cyan-700",
  },
];
