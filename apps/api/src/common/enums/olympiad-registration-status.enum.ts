export enum OlympiadRegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export const OLYMPIAD_REGISTRATION_STATUSES = Object.values(
  OlympiadRegistrationStatus,
);
