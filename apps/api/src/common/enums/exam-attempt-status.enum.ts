export enum ExamAttemptStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  EVALUATED = 'EVALUATED',
  EXPIRED = 'EXPIRED',
}

export const EXAM_ATTEMPT_STATUSES = Object.values(ExamAttemptStatus);
