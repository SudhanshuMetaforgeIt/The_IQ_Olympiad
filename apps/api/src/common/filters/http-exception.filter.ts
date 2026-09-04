import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import multer from 'multer';

type ErrorBody = {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url?: string }>();

    const status = this.resolveStatus(exception);
    const { message, errors } = this.normalizeException(exception);

    const body: ErrorBody = {
      success: false,
      statusCode: status,
      message,
      ...(errors?.length ? { errors } : {}),
      timestamp: new Date().toISOString(),
      path: request.url ?? '',
    };

    response.status(status).json(body);
  }

  private resolveStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (exception instanceof multer.MulterError) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private normalizeException(exception: unknown): {
    message: string;
    errors?: string[];
  } {
    if (exception instanceof multer.MulterError) {
      if (exception.code === 'LIMIT_FILE_SIZE') {
        return { message: 'photo must be 5MB or smaller' };
      }
      if (exception.code === 'LIMIT_UNEXPECTED_FILE') {
        return { message: 'Unexpected file field. Use field name "photo"' };
      }
      return { message: exception.message };
    }

    if (!(exception instanceof HttpException)) {
      return { message: 'Internal server error' };
    }

    const payload = exception.getResponse();

    if (typeof payload === 'string') {
      return { message: payload };
    }

    if (typeof payload === 'object' && payload !== null) {
      const record = payload as Record<string, unknown>;
      const rawMessage = record.message;

      if (Array.isArray(rawMessage)) {
        const errors = rawMessage.map(String);
        return {
          message: errors[0] ?? exception.message,
          errors,
        };
      }

      if (typeof rawMessage === 'string') {
        return { message: rawMessage };
      }
    }

    return { message: exception.message };
  }
}
