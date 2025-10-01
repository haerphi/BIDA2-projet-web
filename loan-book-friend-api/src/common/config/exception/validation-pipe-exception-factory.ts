import { ValidationException } from '@common/exceptions';
import { ValidationError } from '@nestjs/common';

export interface ValidationFieldError {
    field: string;
    errors: string[];
}

export const exceptionFactory = (
    validationErrors: ValidationError[] = [],
): ValidationException => {
    return new ValidationException(
        validationErrors.map(
            (error): ValidationFieldError => ({
                field: error.property,
                errors: Object.values(error.constraints || {}),
            }),
        ),
    );
};
