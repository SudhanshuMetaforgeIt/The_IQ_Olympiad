import demoData from "./sample_que_demo.json";

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
  answer?: string;
  explanation?: string;
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

const EXCLUDED_QUESTION_IDS = new Set([
  "THINK_003",
  "THINK_008",
  "THINK_008_REPLACEMENT",
  "THINK_008_FINAL",
  "THINK_009",
  "ANALYSE_004",
  "DECIDE_009",
  "DECIDE_010",
  "CREATE_001",
  "CREATE_001_VALID",
  "CREATE_007",
  "CREATE_009",
]);

export function getDefaultDemoExam(examId = "68d123abc"): ExamDetails {
  const questions: ExamQuestion[] = [];

  for (const section of (demoData as any).sections || []) {
    for (const q of (section.questions as any[]) || []) {
      if (EXCLUDED_QUESTION_IDS.has(q.question_id)) {
        continue;
      }
      const rawOptions = q.options || {};
      const options: ExamOption[] = Object.entries(rawOptions).map(([key, val]) => ({
        id: key,
        text: String(val),
      }));

      const rawAnswer = q.correct_answer;
      const answer = Array.isArray(rawAnswer) ? String(rawAnswer[0]) : String(rawAnswer ?? "A");

      questions.push({
        id: q.question_id,
        subject: getExamPartLabelFromDomain(q.section || section.section_id),
        question: q.question_corrected ?? q.question,
        options,
        marks: 2,
        cognitiveDomain: q.section || section.section_id,
        difficulty: q.difficulty || "MEDIUM",
        questionType: "MCQ",
        answer,
        explanation: typeof q.verification === "string" ? q.verification : undefined,
      });
    }
  }

  return {
    id: examId,
    title: demoData.title || "The IQ Olympiad",
    category: "Cognitive Abilities Assessment",
    grade: (demoData as any).exam?.target_classes
      ? `Classes ${(demoData as any).exam.target_classes}`
      : "Classes 7–12",
    durationMinutes: (demoData as any).exam?.duration_minutes ?? 50,
    totalMarks: (demoData as any).exam?.total_marks ?? questions.length * 2,
    passingMarks: Math.floor(((demoData as any).exam?.total_marks ?? 100) / 2),
    questions,
  };
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
