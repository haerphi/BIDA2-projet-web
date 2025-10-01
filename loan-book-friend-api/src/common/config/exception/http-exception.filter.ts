import { Response } from 'express';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import { isInstanceOf } from '@common/utils/array.utils';

import {
    CredentialNotFoundException,
    NotFoundException as CustomNotFoundException,
    ServerErrorException,
    TokenExpiredException,
    TokenGenerationException,
    ValidationException,
    WrongCredentialException,
} from '@common/exceptions';
import {
    EmailAlreadyExistException,
    NameAlreadyExistException,
} from '@common/exceptions/user.exceptions';
import { ValidationFieldError } from './validation-pipe-exception-factory';

interface ApiErrorResult {
    code: string;
    form?: ValidationFieldError[];
}

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.I_AM_A_TEAPOT;

        const errorResponse: ApiErrorResult = {
            code: '',
        };

        if (
            isInstanceOf(
                exception,
                NotFoundException,
                CustomNotFoundException,
                CredentialNotFoundException,
            )
        ) {
            status = HttpStatus.NOT_FOUND;
            errorResponse.code = exception.message;
        } else if (
            isInstanceOf(
                exception,
                WrongCredentialException,
                EmailAlreadyExistException,
                NameAlreadyExistException,
            )
        ) {
            status = HttpStatus.BAD_REQUEST;
            errorResponse.code = exception.message;
        } else if (exception instanceof ValidationException) {
            status = HttpStatus.BAD_REQUEST;
            errorResponse.code = exception.message;
            errorResponse.form = (exception as any as ValidationException).form;
        } else if (isInstanceOf(exception, ForbiddenException)) {
            status = HttpStatus.FORBIDDEN;
            errorResponse.code = exception.message;
        } else if (
            isInstanceOf(
                exception,
                ServerErrorException,
                TokenGenerationException,
                TokenExpiredException,
            )
        ) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorResponse.code = exception.message;
        } else {
            // transform to Server error
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorResponse.code = new ServerErrorException().message;
        }

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            // TODO log error
            // TODO send to monitoring service (Sentry)
            console.error(exception);
        }

        response.status(status).json(errorResponse);
    }
}
