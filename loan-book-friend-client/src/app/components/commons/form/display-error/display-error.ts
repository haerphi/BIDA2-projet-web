import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { hasSameAsError, isRequired } from '@core/validators';

@Component({
    selector: 'app-form-input-display-error',
    imports: [],
    templateUrl: './display-error.html',
    styleUrl: './display-error.scss',
})
export class FormInputDisplayError {
    protected readonly isRequired = isRequired;
    protected readonly hasSameAsError = hasSameAsError;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control = input.required<AbstractControl<any, any, any>>();
    name = input.required<string>();
    formErrorFields = input<unknown[] | null | undefined>();

    checkFormFieldError(key: string): unknown[] {
        const FEF = this.formErrorFields();
        if (!FEF) {
            return [];
        }

        return fromValidationFieldError(FEF, key);
    }
}
