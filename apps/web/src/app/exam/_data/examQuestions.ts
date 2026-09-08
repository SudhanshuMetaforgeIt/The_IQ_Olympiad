export type ExamOption = {
  id: string;
  text: string;
};

export type ExamQuestion = {
  id: string;
  subject: string;
  question: string;
  options: ExamOption[];
  marks: number;
  cognitiveDomain: string;
  difficulty: string;
  questionType: string;
};

export type ExamDetails = {
  id: string;
  title: string;
  category: string;
  grade: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: ExamQuestion[];
};

const DOMAIN_PART_LABELS: Record<string, string> = {
  THINK: "PART A — THINK",
  ANALYSE: "PART B — ANALYSE",
  SOLVE: "PART C — SOLVE",
  DECIDE: "PART D — DECIDE",
  CREATE: "PART E — CREATE",
};

export function getExamPartLabelFromDomain(domain: string): string {
  return DOMAIN_PART_LABELS[domain] ?? domain;
}

/** Fallback by 1-based position when domain is unavailable. */
export function getExamPartLabel(questionIndex1Based: number): string {
  if (questionIndex1Based <= 10) return "PART A — THINK";
  if (questionIndex1Based <= 20) return "PART B — ANALYSE";
  if (questionIndex1Based <= 30) return "PART C — SOLVE";
  if (questionIndex1Based <= 40) return "PART D — DECIDE";
  return "PART E — CREATE";
}

export function buildDemoExamDetails(
  examId: string,
  payload: {
    title: string;
    totalMarks: number;
    questions: Array<{
      id: string;
      questionText: string;
      questionType: string;
      cognitiveDomain: string;
      difficulty: string;
      options: ExamOption[];
      marks: number;
    }>;
  }
): ExamDetails {
  return {
    id: examId,
    title: payload.title || "The IQ Olympiad",
    category: "Cognitive Abilities Assessment",
    grade: "Classes 7–12",
    durationMinutes: Math.max(payload.questions.length, 1),
    totalMarks: payload.totalMarks,
    passingMarks: Math.floor(payload.totalMarks / 2),
    questions: payload.questions.map((question) => ({
      id: question.id,
      subject: getExamPartLabelFromDomain(question.cognitiveDomain),
      question: question.questionText,
      options: question.options,
      marks: question.marks,
      cognitiveDomain: question.cognitiveDomain,
      difficulty: question.difficulty,
      questionType: question.questionType,
    })),
  };
}
