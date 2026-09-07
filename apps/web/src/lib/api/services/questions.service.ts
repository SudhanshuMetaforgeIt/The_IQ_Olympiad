import { apiRequest } from "../client";

export type StudentQuestionOption = {
  id: string;
  text: string;
};

export type StudentQuestion = {
  id: string;
  questionText: string;
  questionType: string;
  cognitiveDomain: string;
  difficulty: string;
  options: StudentQuestionOption[];
  marks: number;
};

export type DemoExamQuestionsResponse = {
  title: string;
  totalQuestions: number;
  totalMarks: number;
  marksPerQuestion: number;
  questions: StudentQuestion[];
};

export type ApprovedQuestionsQuery = {
  cognitiveDomain?: string;
  difficulty?: string;
};

export type DemoExamAnswerPayload = {
  questionId: string;
  selectedOptionIds: string[];
};

export type DemoExamSectionScore = {
  cognitiveDomain: string;
  score: number;
  maxScore: number;
  attempted: number;
  correct: number;
};

export type DemoExamResult = {
  totalScore: number;
  totalMarks: number;
  attempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  sectionScores: DemoExamSectionScore[];
};

export async function getDemoExamQuestions(
  signal?: AbortSignal
): Promise<DemoExamQuestionsResponse> {
  return apiRequest<DemoExamQuestionsResponse>("/api/questions/demo", {
    method: "GET",
    signal,
  });
}

export async function submitDemoExamAnswers(
  answers: DemoExamAnswerPayload[],
  signal?: AbortSignal
): Promise<DemoExamResult> {
  return apiRequest<DemoExamResult>("/api/questions/demo/submit", {
    method: "POST",
    body: { answers },
    signal,
  });
}

export async function getApprovedQuestions(
  query: ApprovedQuestionsQuery = {},
  signal?: AbortSignal
): Promise<StudentQuestion[]> {
  const params = new URLSearchParams();
  if (query.cognitiveDomain) {
    params.set("cognitiveDomain", query.cognitiveDomain);
  }
  if (query.difficulty) {
    params.set("difficulty", query.difficulty);
  }
  const qs = params.toString();
  return apiRequest<StudentQuestion[]>(
    `/api/questions/approved${qs ? `?${qs}` : ""}`,
    {
      method: "GET",
      signal,
    }
  );
}
