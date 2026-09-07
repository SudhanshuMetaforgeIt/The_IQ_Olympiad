import * as fs from 'fs';
import * as path from 'path';
import { Model } from 'mongoose';

import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { QuestionDifficulty } from '../common/enums/question-difficulty.enum.js';
import { QuestionSource } from '../common/enums/question-source.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import {
  Question,
  QuestionDocument,
} from '../questions/schemas/question.schema.js';

/**
 * Source JSON question structure (sample_que_demo.json)
 */
interface SourceQuestion {
  question_id: string;
  section: string;
  cognitive_skill?: string;
  construction_type?: string;
  difficulty: string;

  question: string;
  question_corrected?: string;

  options: Record<string, string>;

  correct_answer: string | string[];

  verification?: string;
  verification_corrected?: string;

  diagram?: string | null;
  flag?: string;
}

interface SourceSection {
  section_id: string;
  section_name: string;
  questions: SourceQuestion[];
}

interface SourcePaper {
  paper_id: string;
  title: string;
  exam?: {
    marks_per_question?: number;
  };
  sections: SourceSection[];
}

/**
 * Questions that are invalid/superseded and must NOT be inserted.
 *
 * We use their final replacement versions instead.
 */
const EXCLUDED_QUESTION_IDS = new Set([
  // THINK replacements
  'THINK_003',
  'THINK_008',
  'THINK_008_REPLACEMENT',
  'THINK_008_FINAL',
  'THINK_009',

  // ANALYSE replacements
  'ANALYSE_004',

  // DECIDE replacements
  'DECIDE_009',
  'DECIDE_010',

  // CREATE replacements
  'CREATE_001',
  'CREATE_001_VALID',
  'CREATE_007',
  'CREATE_009',
]);

/**
 * Final replacement questions that SHOULD be included.
 *
 * These replace invalid originals.
 */
const REQUIRED_REPLACEMENT_IDS = new Set([
  'THINK_003_REPLACEMENT',
  'THINK_008_VALID',
  'THINK_009_VALID',

  'ANALYSE_004_VALID',

  'DECIDE_009_VALID',
  'DECIDE_010_VALID',

  'CREATE_001_FINAL',
  'CREATE_007_VALID',
  'CREATE_009_VALID',
]);

/**
 * Maps source difficulty values to schema enum values.
 *
 * Schema supports EASY | MEDIUM | HARD only.
 * MEDIUM-HARD is mapped to HARD (smallest compatible change).
 */
function normalizeDifficulty(difficulty: string): QuestionDifficulty {
  const normalized = difficulty.trim().toUpperCase();

  const difficultyMap: Record<string, QuestionDifficulty> = {
    EASY: QuestionDifficulty.EASY,
    MEDIUM: QuestionDifficulty.MEDIUM,
    HARD: QuestionDifficulty.HARD,
    'MEDIUM-HARD': QuestionDifficulty.HARD,
    MEDIUM_HARD: QuestionDifficulty.HARD,
  };

  const mapped = difficultyMap[normalized];
  if (!mapped) {
    throw new Error(`Unsupported difficulty value: ${difficulty}`);
  }

  return mapped;
}

function normalizeDomain(section: string): CognitiveDomain {
  const normalized = section.trim().toUpperCase();
  const domains = Object.values(CognitiveDomain) as string[];

  if (!domains.includes(normalized)) {
    throw new Error(`Unsupported cognitive domain: ${section}`);
  }

  return normalized as CognitiveDomain;
}

/**
 * Converts:
 *
 * {
 *   A: "Option 1",
 *   B: "Option 2"
 * }
 *
 * into schema QuestionOption[]:
 *
 * [
 *   { id: "A", text: "Option 1" },
 *   { id: "B", text: "Option 2" }
 * ]
 */
function transformOptions(options: Record<string, string>) {
  return Object.entries(options).map(([id, text]) => ({
    id,
    text,
  }));
}

/**
 * Normalizes the answer into correctOptionIds[].
 *
 * MCQ:
 * "A" -> ["A"]
 *
 * Multiple select:
 * ["A", "C"] -> ["A", "C"]
 */
function normalizeCorrectAnswers(
  correctAnswer: string | string[],
): string[] {
  if (Array.isArray(correctAnswer)) {
    return correctAnswer;
  }

  return [correctAnswer];
}

/**
 * Returns the corrected question when available.
 */
function getQuestionText(question: SourceQuestion): string {
  return question.question_corrected ?? question.question;
}

/**
 * Returns corrected verification/explanation when available.
 */
function getExplanation(question: SourceQuestion): string {
  return (
    question.verification_corrected ??
    question.verification ??
    ''
  );
}

/**
 * Main seed function.
 *
 * Usage (via Nest application context):
 *
 * await seedQuestions(QuestionModel);
 */
export async function seedQuestions(
  questionModel: Model<QuestionDocument>,
): Promise<void> {
  console.log('\n========================================');
  console.log('THE IQ OLYMPIAD - QUESTION SEED');
  console.log('========================================\n');

  /**
   * Resolved from apps/api working directory:
   * apps/api/data/sample_que_demo.json
   */
  const jsonPath = path.resolve(
    process.cwd(),
    'data',
    'sample_que_demo.json',
  );

  if (!fs.existsSync(jsonPath)) {
    throw new Error(
      `Question JSON file not found at: ${jsonPath}`,
    );
  }

  console.log(`Reading questions from: ${jsonPath}`);

  const rawJson = fs.readFileSync(jsonPath, 'utf-8');

  const paper: SourcePaper = JSON.parse(rawJson);

  console.log(`Paper ID: ${paper.paper_id}`);
  console.log(`Title: ${paper.title}`);
  console.log(`Sections found: ${paper.sections.length}\n`);

  const marksPerQuestion = paper.exam?.marks_per_question ?? 2;

  /**
   * Flatten all sections into one array.
   */
  const allQuestions = paper.sections.flatMap(
    (section) => section.questions,
  );

  console.log(
    `Total question objects in source: ${allQuestions.length}`,
  );

  /**
   * Remove explicitly invalid/superseded questions.
   */
  const selectedQuestions = allQuestions.filter(
    (question) =>
      !EXCLUDED_QUESTION_IDS.has(question.question_id),
  );

  /**
   * Check that required replacements are actually present.
   */
  const selectedIds = new Set(
    selectedQuestions.map((question) => question.question_id),
  );

  const missingReplacements = [
    ...REQUIRED_REPLACEMENT_IDS,
  ].filter((id) => !selectedIds.has(id));

  if (missingReplacements.length > 0) {
    throw new Error(
      `Missing required replacement questions:\n${missingReplacements.join(
        '\n',
      )}`,
    );
  }

  /**
   * Ensure no duplicate question IDs.
   */
  const duplicateIds = selectedQuestions
    .map((question) => question.question_id)
    .filter(
      (id, index, array) =>
        array.indexOf(id) !== index,
    );

  if (duplicateIds.length > 0) {
    throw new Error(
      `Duplicate question IDs found:\n${[
        ...new Set(duplicateIds),
      ].join('\n')}`,
    );
  }

  /**
   * Final validation.
   *
   * The demo paper must contain exactly:
   * 5 sections × 10 questions = 50 questions
   */
  if (selectedQuestions.length !== 50) {
    throw new Error(
      `Expected exactly 50 final questions, but found ${selectedQuestions.length}`,
    );
  }

  console.log(
    `Final selected questions: ${selectedQuestions.length}`,
  );

  /**
   * Count questions by section.
   */
  const sectionCounts = selectedQuestions.reduce(
    (acc, question) => {
      acc[question.section] =
        (acc[question.section] ?? 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );

  console.log('\nQuestions by section:');

  for (const [section, count] of Object.entries(
    sectionCounts,
  )) {
    console.log(`  ${section}: ${count}`);
  }

  /**
   * Validate expected section distribution.
   */
  const expectedSections = [
    'THINK',
    'ANALYSE',
    'SOLVE',
    'DECIDE',
    'CREATE',
  ];

  for (const section of expectedSections) {
    if (sectionCounts[section] !== 10) {
      throw new Error(
        `Expected 10 questions in ${section}, but found ${
          sectionCounts[section] ?? 0
        }`,
      );
    }
  }

  /**
   * Transform source questions into Question documents
   * matching the existing Question schema.
   */
  const questionsToInsert: Partial<Question>[] =
    selectedQuestions.map((sourceQuestion) => {
      const options = transformOptions(sourceQuestion.options);
      const correctOptionIds = normalizeCorrectAnswers(
        sourceQuestion.correct_answer,
      );

      for (const answerId of correctOptionIds) {
        if (!options.some((option) => option.id === answerId)) {
          throw new Error(
            `${sourceQuestion.question_id}: correct answer "${answerId}" is not in options`,
          );
        }
      }

      return {
        externalId: sourceQuestion.question_id,

        questionText: getQuestionText(sourceQuestion),

        questionType: QuestionType.MCQ,

        cognitiveDomain: normalizeDomain(sourceQuestion.section),

        difficulty: normalizeDifficulty(sourceQuestion.difficulty),

        marks: marksPerQuestion,

        options,

        correctOptionIds,

        explanation: getExplanation(sourceQuestion) || undefined,

        status: QuestionStatus.APPROVED,

        generation: {
          source: QuestionSource.AI,
        },

        usageCount: 0,
      };
    });

  /**
   * Remove previously seeded demo questions.
   *
   * We only delete documents with our external IDs,
   * so this seed does not wipe unrelated questions.
   */
  const externalIds = questionsToInsert.map(
    (question) => question.externalId as string,
  );

  console.log(
    '\nRemoving previously seeded demo questions...',
  );

  const deleteResult = await questionModel.deleteMany({
    externalId: {
      $in: externalIds,
    },
  });

  console.log(
    `Removed ${deleteResult.deletedCount} existing question(s).`,
  );

  /**
   * Insert all 50 questions.
   */
  console.log('\nInserting questions...');

  const insertedQuestions =
    await questionModel.insertMany(questionsToInsert, {
      ordered: true,
    });

  console.log(
    `Successfully inserted ${insertedQuestions.length} questions.`,
  );

  /**
   * Final database verification.
   */
  const finalCount = await questionModel.countDocuments({
    externalId: {
      $in: externalIds,
    },
  });

  console.log(
    `Verified questions in database: ${finalCount}`,
  );

  if (finalCount !== 50) {
    throw new Error(
      `Database verification failed. Expected 50, found ${finalCount}.`,
    );
  }

  console.log('\n========================================');
  console.log('QUESTION SEED COMPLETED SUCCESSFULLY');
  console.log('========================================');
  console.log(`Paper: ${paper.title}`);
  console.log(`Questions: ${finalCount}`);
  console.log('Sections: 5');
  console.log('Questions per section: 10');
  console.log(`Marks per question: ${marksPerQuestion}`);
  console.log('========================================\n');
}
