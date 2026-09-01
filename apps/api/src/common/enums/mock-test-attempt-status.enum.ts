export enum MockTestAttemptStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  EVALUATED = 'EVALUATED',
  EXPIRED = 'EXPIRED',
}

export const MOCK_TEST_ATTEMPT_STATUSES = Object.values(MockTestAttemptStatus);
