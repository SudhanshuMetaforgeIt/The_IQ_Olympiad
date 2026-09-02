export enum QuestionStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export const QUESTION_STATUSES = Object.values(QuestionStatus);
