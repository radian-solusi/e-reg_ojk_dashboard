import { BaseErrorResponse } from "./response";

interface ValidationErrorResponse {
    message: string;
    type: "validation_error";
    field: string;
}

interface InvalidCredentialErrorResponse {
    message: string;
    type: "invalid_credential";
}

interface TooManyAttemptErrorResponse {
    message: string;
    type: "too_many_request";
    blocked_until: number;
}

export type ErrorResponse = BaseErrorResponse<ValidationErrorResponse | InvalidCredentialErrorResponse | TooManyAttemptErrorResponse>
