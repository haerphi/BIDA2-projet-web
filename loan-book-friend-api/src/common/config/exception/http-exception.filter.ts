import { Response } from 'express';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { isInstanceOf } from '@common/utils/array.utils';

import {
    CredentialNotFoundException,
    NotFoundException,
    ServerErrorException,
    TokenExpiredException,
    TokenGenerationException,
    WrongCredentialException,
} from '@common/exceptions';
import {
    EmailAlreadyExistException,
    NameAlreadyExistException,
} from '@common/exceptions/user.exceptions';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.I_AM_A_TEAPOT;
        let message = '';

        if (
            isInstanceOf(
                exception,
                NotFoundException,
                CredentialNotFoundException,
            )
        ) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (
            isInstanceOf(
                exception,
                WrongCredentialException,
                EmailAlreadyExistException,
                NameAlreadyExistException,
            )
        ) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (
            isInstanceOf(
                exception,
                ServerErrorException,
                TokenGenerationException,
                TokenExpiredException,
            )
        ) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message;
        } else {
            // transform to Server error
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = new ServerErrorException().message;
        }

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            // TODO log error
            // TODO send to monitoring service (Sentry)
            console.error(exception);
        }

        response.status(status).json({
            code: message,
        });
    }
}
