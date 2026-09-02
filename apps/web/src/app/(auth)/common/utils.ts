export function formatMobileNumber(val: string): string {
  let digits = val.replace(/\D/g, "");
  if (digits.length > 0 && !/^[6-9]/.test(digits)) {
    digits = "";
  }
  return digits.slice(0, 10);
}

export function formatOtp(val: string): string {
  return val.replace(/\D/g, "").slice(0, 6);
}

export type AuthRole = "student" | "school";
