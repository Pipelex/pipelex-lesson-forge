/**
 * Result type for Server Actions and API calls
 * Never throw in Server Actions - return typed results instead
 */

export type Result<T> = { success: true; data: T } | { success: false; error: ErrorResult };

export type ErrorResult = {
  type: 'validation' | 'auth' | 'not_found' | 'external' | 'internal';
  message: string;
  details?: Record<string, unknown>;
};

/**
 * Helper to create success result
 */
export function success<T>(data: T): Result<T> {
  return { success: true, data };
}

/**
 * Helper to create error result
 */
export function error<T>(
  type: ErrorResult['type'],
  message: string,
  details?: Record<string, unknown>,
): Result<T> {
  return {
    success: false,
    error: { type, message, details },
  };
}

/**
 * Helper to create validation error result
 */
export function validationError<T>(message: string, details?: Record<string, unknown>): Result<T> {
  return error('validation', message, details);
}

/**
 * Helper to create external service error result
 */
export function externalError<T>(message: string, details?: Record<string, unknown>): Result<T> {
  return error('external', message, details);
}

/**
 * Helper to create internal error result
 */
export function internalError<T>(message: string, details?: Record<string, unknown>): Result<T> {
  return error('internal', message, details);
}
