export interface ValidationFieldError {
    field: string;
    errors: string[];
}

export class ApiErrorResponse extends Error {
    code: string;
    form?: ValidationFieldError[];

    constructor(code: string, form?: ValidationFieldError[]) {
        super(code);
        this.code = code;
        this.form = form;
    }
}

export interface ApiListResponse<T> {
    data: T[];
    total: number;
}

export interface ApiPaginationQueryParams {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
}
