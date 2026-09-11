export interface PracticeTestItem {
  id: number;
  testNumber: number;
  title: string;
  topic: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  isCompleted: boolean;
  score?: number;
  maxScore?: number;
}

export const SUBJECT_PRACTICE_TESTS_MAP: Record<string, PracticeTestItem[]> = {};
