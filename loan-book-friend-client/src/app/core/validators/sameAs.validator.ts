import { AbstractControl, ValidatorFn } from '@angular/forms';

export function sameAsValidator(source: string, target: string): ValidatorFn {
    return (group: AbstractControl) => {
        const sourceControl = group.get(source);
        const targetControl = group.get(target);

        if (!sourceControl || !targetControl) {
            return null;
        }

        const areSame = sourceControl.value === targetControl.value;

        if (!areSame) {
            targetControl.setErrors({ ...targetControl.errors, sameAs: true });
        } else {
            if (targetControl.errors) {
                delete targetControl.errors['sameAs'];
                if (Object.keys(targetControl.errors).length === 0) {
                    targetControl.setErrors(null);
                }
            }
        }

        return null;
    };
}
