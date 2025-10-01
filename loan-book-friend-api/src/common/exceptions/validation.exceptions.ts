import { ValidationFieldError } from '@common/config/exception';

export class ValidationException extends Error {
    form: ValidationFieldError[] = [];

    constructor(form: ValidationFieldError[]) {
        super('api.exception.error_validation_form');
        this.form = form;
    }
}
