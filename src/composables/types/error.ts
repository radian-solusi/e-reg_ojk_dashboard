import { BaseErrorResponse } from "./response";

interface ValidationErrorResponse {
    error_type: "validation_error",
    data : { error:  Record<string, string[]> }
}

interface InvalidCredentialErrorResponse {
    error_type: "invalid_credential",
    data : { error:  string } 
}

interface TooManyAttemptErrorResponse {
    error_type: "too_many_request",
    data: {
        error : string
        blocked_until : number
    }
}

export type ErrorResponse = BaseErrorResponse<ValidationErrorResponse | InvalidCredentialErrorResponse | TooManyAttemptErrorResponse>
