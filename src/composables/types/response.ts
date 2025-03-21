/**
 * Base response structure for successful API responses.
 * @template T - Type of the data returned in the response.
 */
export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

/**
 * Base response structure for error API responses.
 * @template T - Type representing the error details.
 *              Must include `error_type` (e.g., "validation_error", "invalid_credential")
 *              and `data` (e.g., { error: string } or { errors: Record<string, string[]> }).
 */
export type BaseErrorResponse<T extends { error_type: string; data: unknown }> = {
    success: false;
    message: string;
  } & T;
  
