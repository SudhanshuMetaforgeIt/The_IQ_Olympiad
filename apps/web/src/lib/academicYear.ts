/** API contract: academicYear must match YYYY-YY (e.g. 2026-27). */

const ACADEMIC_YEAR_REGEX = /^\d{4}-\d{2}$/;

export function isAcademicYear(value: string): boolean {
  return ACADEMIC_YEAR_REGEX.test(value);
}

export function formatAcademicYear(startYear: number): string {
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

/** Indian school year is treated as April–March. */
export function getCurrentAcademicYearStart(now = new Date()): number {
  return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
}

export function getCurrentAcademicYear(now = new Date()): string {
  return formatAcademicYear(getCurrentAcademicYearStart(now));
}

export function getAcademicYearOptions(extra?: string): string[] {
  const start = getCurrentAcademicYearStart();
  const years = new Set<string>();

  for (let year = start - 2; year <= start + 2; year += 1) {
    years.add(formatAcademicYear(year));
  }

  if (extra && isAcademicYear(extra)) {
    years.add(extra);
  }

  return [...years].sort().reverse();
}
