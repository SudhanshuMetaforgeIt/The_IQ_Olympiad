export enum PaymentProvider {
  RAZORPAY = 'RAZORPAY',
  STRIPE = 'STRIPE',
  MANUAL = 'MANUAL',
}

export const PAYMENT_PROVIDERS = Object.values(PaymentProvider);
