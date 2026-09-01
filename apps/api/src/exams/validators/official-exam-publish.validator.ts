import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';

const REQUIRED_SECTION_COUNT = 5;
const REQUIRED_QUESTIONS_PER_SECTION = 10;
const REQUIRED_MARKS_PER_SECTION = 20;
const REQUIRED_TOTAL_QUESTIONS = 50;
const REQUIRED_TOTAL_MARKS = 100;

export type OfficialExamPublishSection = {
  cognitiveDomain: CognitiveDomain;
  marks: number;
  questionCount: number;
};

export type OfficialExamPublishQuestion = {
  questionId: { toString(): string } | string;
  cognitiveDomain: CognitiveDomain;
  marks: number;
  order: number;
};

export type OfficialExamPublishCandidate = {
  totalMarks: number;
  totalQuestions: number;
  sections: OfficialExamPublishSection[];
  questions: OfficialExamPublishQuestion[];
};

export type OfficialExamPublishValidationResult = {
  isValid: boolean;
  errors: string[];
};

/**
 * Application-level publish invariant validator. Draft schemas intentionally
 * remain flexible; a future publish service must call this before freezing.
 */
export function validateOfficialExamForPublish(
  candidate: OfficialExamPublishCandidate,
): OfficialExamPublishValidationResult {
  const errors: string[] = [];
  const requiredDomains = new Set<CognitiveDomain>(COGNITIVE_DOMAINS);
  const sectionDomains = candidate.sections.map(
    (section) => section.cognitiveDomain,
  );

  if (candidate.sections.length !== REQUIRED_SECTION_COUNT) {
    errors.push('Official exams must contain exactly 5 sections');
  }

  if (
    new Set(sectionDomains).size !== requiredDomains.size ||
    [...requiredDomains].some((domain) => !sectionDomains.includes(domain))
  ) {
    errors.push('Each cognitive domain must appear exactly once');
  }

  if (candidate.totalQuestions !== REQUIRED_TOTAL_QUESTIONS) {
    errors.push('Official exams must declare exactly 50 questions');
  }

  if (candidate.totalMarks !== REQUIRED_TOTAL_MARKS) {
    errors.push('Official exams must declare exactly 100 marks');
  }

  if (candidate.questions.length !== REQUIRED_TOTAL_QUESTIONS) {
    errors.push('Official exams must assign exactly 50 questions');
  }

  const questionIds = candidate.questions.map((question) =>
    question.questionId.toString(),
  );
  if (new Set(questionIds).size !== questionIds.length) {
    errors.push('Official exams cannot contain duplicate questions');
  }

  const orders = candidate.questions.map((question) => question.order);
  if (new Set(orders).size !== orders.length) {
    errors.push('Official exam question order values must be unique');
  }

  const assignedMarks = candidate.questions.reduce(
    (total, question) => total + question.marks,
    0,
  );
  if (assignedMarks !== REQUIRED_TOTAL_MARKS) {
    errors.push('Assigned question marks must total 100');
  }

  for (const domain of requiredDomains) {
    const section = candidate.sections.find(
      (item) => item.cognitiveDomain === domain,
    );
    const questions = candidate.questions.filter(
      (question) => question.cognitiveDomain === domain,
    );
    const marks = questions.reduce(
      (total, question) => total + question.marks,
      0,
    );

    if (section?.questionCount !== REQUIRED_QUESTIONS_PER_SECTION) {
      errors.push(`${domain} section must declare exactly 10 questions`);
    }

    if (section?.marks !== REQUIRED_MARKS_PER_SECTION) {
      errors.push(`${domain} section must declare exactly 20 marks`);
    }

    if (questions.length !== REQUIRED_QUESTIONS_PER_SECTION) {
      errors.push(`${domain} section must assign exactly 10 questions`);
    }

    if (marks !== REQUIRED_MARKS_PER_SECTION) {
      errors.push(`${domain} assigned question marks must total 20`);
    }

    if (
      section &&
      (section.questionCount !== questions.length || section.marks !== marks)
    ) {
      errors.push(
        `${domain} section totals must match its question assignments`,
      );
    }
  }

  return { isValid: errors.length === 0, errors };
}
