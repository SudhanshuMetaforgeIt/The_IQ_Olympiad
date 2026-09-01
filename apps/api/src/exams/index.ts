export { ExamsModule } from './exams.module.js';
export {
  Exam,
  ExamSchema,
  ExamSection,
  ExamSectionSchema,
  ExamQuestion,
  ExamQuestionSchema,
  type ExamDocument,
} from './schemas/exam.schema.js';
export {
  ExamVersion,
  ExamVersionSchema,
  ExamVersionQuestion,
  ExamVersionQuestionSchema,
  type ExamVersionDocument,
} from './schemas/exam-version.schema.js';
export {
  validateOfficialExamForPublish,
  type OfficialExamPublishCandidate,
  type OfficialExamPublishQuestion,
  type OfficialExamPublishSection,
  type OfficialExamPublishValidationResult,
} from './validators/official-exam-publish.validator.js';
