import { HttpException } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api/api-code.response';

export class ApiException extends HttpException {
    constructor(code: ApiCodeResponse, status: number) {
        super(
            {
                code,
                data: null,
                result: false,
            },
            status,
        );
    }
}
