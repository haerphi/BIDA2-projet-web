import { ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
    return (control) => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
        const isValidLength = value.length >= 8;

        const passwordValid =
            hasUpperCase &&
            hasLowerCase &&
            hasNumeric &&
            hasSpecialChar &&
            isValidLength;
        return !passwordValid ? { strongPassword: true } : null;
    };
}
