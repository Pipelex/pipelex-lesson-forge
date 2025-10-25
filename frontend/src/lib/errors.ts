/**
 * Custom error classes for the application
 * All errors extend AppError base class for consistent error handling
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public userMessage: string,
    public technicalDetails?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'Invalid input provided',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 400, userMessage, technicalDetails);
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'Authentication required',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 401, userMessage, technicalDetails);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'You do not have permission to perform this action',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 403, userMessage, technicalDetails);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'Resource not found',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 404, userMessage, technicalDetails);
  }
}

export class ExternalServiceError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'External service is unavailable. Please try again later.',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 502, userMessage, technicalDetails);
  }
}

export class InternalError extends AppError {
  constructor(
    message: string,
    userMessage: string = 'An unexpected error occurred. Please try again.',
    technicalDetails?: Record<string, unknown>,
  ) {
    super(message, 500, userMessage, technicalDetails);
  }
}

/**
 * Helper to check if an error is an AppError instance
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Helper to convert unknown errors to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalError(error.message, 'An unexpected error occurred', {
      originalError: error.name,
    });
  }

  return new InternalError('Unknown error', 'An unexpected error occurred', {
    error: String(error),
  });
}

/**
 * Server-side error logger
 * Logs full error context without exposing to client
 */
export function logError(error: AppError | Error, context?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  const errorData = {
    timestamp,
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...context,
  };

  if (isAppError(error)) {
    console.error('[AppError]', {
      ...errorData,
      statusCode: error.statusCode,
      userMessage: error.userMessage,
      technicalDetails: error.technicalDetails,
    });
  } else {
    console.error('[Error]', errorData);
  }
}
