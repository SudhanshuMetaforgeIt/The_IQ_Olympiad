export enum EntitlementStatus {
  ACTIVE = 'ACTIVE',
  EXHAUSTED = 'EXHAUSTED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export const ENTITLEMENT_STATUSES = Object.values(EntitlementStatus);
