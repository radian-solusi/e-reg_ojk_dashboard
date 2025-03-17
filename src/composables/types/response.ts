export interface SuccessResponse<T> {
    success?: true,
    message?: string,
    data: T,

}

export interface ValidationErrorResponse {
    success: false;
    message: string;
    error_type: "validation_error";
    data: {
        error: Record<string, string[]>;
    };
}

export interface InvalidCredentialErrorResponse {
    success: false;
    message: string;
    error_type: "invalid_credential";
    data: {
        error: string; 
    };
}

export type ErrorResponse = ValidationErrorResponse | InvalidCredentialErrorResponse;
