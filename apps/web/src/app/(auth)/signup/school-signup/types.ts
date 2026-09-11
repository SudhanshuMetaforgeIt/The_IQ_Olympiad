export type SchoolSignupFormData = {
  adminName: string;
  officialEmail: string;
  adminMobile: string;
  password: string;
  confirmPassword: string;
  schoolName: string;
  city: string;
  schoolBranch: string;
  schoolTypes: string[];
  managedClasses: number[];
};

export type SchoolSignupStep = 1 | 2 | 3;

export const SCHOOL_TYPE_LABELS = [
  "Primary (Classes 1 to 5)",
  "Middle (Classes 6 to 8)",
  "Secondary (Classes 9 to 10)",
  "Senior Secondary (Classes 11 to 12)",
] as const;

const SCHOOL_TYPE_BY_LABEL: Record<
  (typeof SCHOOL_TYPE_LABELS)[number],
  "PRIMARY" | "MIDDLE" | "SECONDARY" | "SENIOR_SECONDARY"
> = {
  "Primary (Classes 1 to 5)": "PRIMARY",
  "Middle (Classes 6 to 8)": "MIDDLE",
  "Secondary (Classes 9 to 10)": "SECONDARY",
  "Senior Secondary (Classes 11 to 12)": "SENIOR_SECONDARY",
};

export function buildRegisterSchoolPayload(values: SchoolSignupFormData) {
  return {
    adminName: values.adminName.trim(),
    officialEmail: values.officialEmail.trim().toLowerCase(),
    adminMobile: values.adminMobile.trim(),
    password: values.password,
    schoolName: values.schoolName.trim(),
    schoolBranch: values.schoolBranch.trim() || undefined,
    address: {
      city: values.city.trim(),
    },
    schoolTypes: values.schoolTypes
      .map((label) => SCHOOL_TYPE_BY_LABEL[label as keyof typeof SCHOOL_TYPE_BY_LABEL])
      .filter(Boolean),
    managedClasses: values.managedClasses,
  };
}
