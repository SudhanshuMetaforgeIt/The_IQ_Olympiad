export { QuestionsModule } from './questions.module.js';
export {
  Question,
  QuestionSchema,
  QuestionOption,
  QuestionOptionSchema,
  QuestionGeneration,
  QuestionGenerationSchema,
  type QuestionDocument,
} from './schemas/question.schema.js';
export {
  QuestionVersion,
  QuestionVersionSchema,
  type QuestionVersionDocument,
} from './schemas/question-version.schema.js';
export {
  hasUniqueOptionIds,
  validateQuestionAnswers,
  type QuestionContentValue,
  type QuestionOptionValue,
} from './validators/question-content.validator.js';
