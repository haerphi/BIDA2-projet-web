import { AbstractControl } from '@angular/forms';

//AbstractControl: Parent de nos controles de formulaire
//errorKey =  clé erreur (require, minlenght, maxlength, min, max,...)
function hasError(control: AbstractControl, errorKey?: string) {
    if (!errorKey) return control.invalid && (control.dirty || control.touched);
    else
        return (
            control.invalid &&
            (control.dirty || control.touched) &&
            control.hasError(errorKey)
        );
}

export function isRequired(control: AbstractControl) {
    return hasError(control, 'required');
}

export function hasMinLengthError(control: AbstractControl) {
    return hasError(control, 'minlength');
}

export function hasMaxLengthError(control: AbstractControl) {
    return hasError(control, 'maxlength');
}

export function hasMinError(control: AbstractControl) {
    return hasError(control, 'min');
}

export function hasMaxError(control: AbstractControl) {
    return hasError(control, 'max');
}

export function hasSameAsError(control: AbstractControl) {
    return hasError(control, 'sameAs');
}
