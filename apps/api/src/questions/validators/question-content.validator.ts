import { QuestionType } from '../../common/enums/question-type.enum.js';

export type QuestionOptionValue = {
  id: string;
};

export type QuestionContentValue = {
  questionType?: QuestionType;
  options?: QuestionOptionValue[];
  correctOptionIds?: string[];
};

export function hasUniqueOptionIds(options: QuestionOptionValue[]): boolean {
  const ids = options.map((option) => option.id);
  return new Set(ids).size === ids.length;
}

export function validateQuestionAnswers(
  content: QuestionContentValue,
): true | string {
  const options = content.options ?? [];
  const correctOptionIds = content.correctOptionIds ?? [];

  if (!hasUniqueOptionIds(options)) {
    return 'Option IDs must be unique within a question';
  }

  if (new Set(correctOptionIds).size !== correctOptionIds.length) {
    return 'Correct option IDs must be unique';
  }

  if (
    content.questionType === QuestionType.MCQ &&
    correctOptionIds.length !== 1
  ) {
    return 'MCQ questions must have exactly one correct option ID';
  }

  if (
    content.questionType === QuestionType.MULTIPLE_SELECT &&
    correctOptionIds.length < 1
  ) {
    return 'MULTIPLE_SELECT questions must have at least one correct option ID';
  }

  if (
    content.questionType === QuestionType.OPEN_ENDED &&
    correctOptionIds.length > 0
  ) {
    return 'OPEN_ENDED questions cannot have correct option IDs';
  }

  const optionIds = new Set(options.map((option) => option.id));
  if (correctOptionIds.some((id) => !optionIds.has(id))) {
    return 'Every correct option ID must exist in options';
  }

  return true;
}
