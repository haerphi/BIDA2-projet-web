export interface ValidationFieldError {
    field: string;
    errors: string[];
}

export interface ApiErrorResponse {
    code: string;
    form?: ValidationFieldError[];
}
