import type { StudentProfile } from "@/app/dashboard/student/types";
import type { StudentProfileData } from "@/app/dashboard/student/components/pannel/Profile/types";
import type { StudentClass } from "@/lib/api/services/auth.types";
import type { StudentMeResponse } from "@/lib/api/services/students.types";

/** Maps CLASS_8 → "Class 8" for chrome display. */
export function formatAcademicClass(academicClass: StudentClass | string): string {
  const match = /^CLASS_(\d+)$/.exec(academicClass);
  if (match) {
    return `Class ${match[1]}`;
  }
  return academicClass;
}

/** Formats ISO date for profile date inputs / display (yyyy-mm-dd). */
export function formatDateOfBirth(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

/** Shell identity used by Sidebar / HeaderBar / panel chrome. */
export function toStudentShell(data: StudentMeResponse): StudentProfile {
  return {
    name: data.profile.fullName || data.user.name,
    grade: formatAcademicClass(data.profile.academicClass),
    school: data.school.name,
    avatarUrl: "",
    unreadNotifications: 0,
  };
}

/** Profile panel form model mapped from API fields that exist. */
export function toStudentProfileFormData(data: StudentMeResponse): StudentProfileData {
  return {
    fullName: data.profile.fullName || data.user.name,
    className: formatAcademicClass(data.profile.academicClass),
    email: data.user.email,
    phone: data.user.phone ?? "",
    schoolName: data.school.code
      ? `${data.school.name} (${data.school.code})`
      : data.school.name,
    academicYear: data.profile.academicYear,
    section: data.profile.section,
    rollNumber: data.profile.rollNumber,
    studentId: data.profile.id,
    dateOfBirth: formatDateOfBirth(data.profile.dateOfBirth),
    gender: "",
    country: "",
    aadharNumber: "",
    isAadharVerified: false,
  };
}
