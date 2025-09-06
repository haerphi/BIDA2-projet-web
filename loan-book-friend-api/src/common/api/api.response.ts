import { ApiCodeResponse } from './api-code.response';

export interface ApiResponse<T = any> {
    result: boolean;
    code: ApiCodeResponse;
    data: T;
}
