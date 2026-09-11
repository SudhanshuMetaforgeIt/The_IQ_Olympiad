export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp?: string;
  path?: string;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors: string[];

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
