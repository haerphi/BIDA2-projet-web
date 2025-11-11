/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UserDetails } from '@core/models';
import { sameAsValidator, strongPasswordValidator } from '@core/validators';

export interface EditFormControls {
    name: AbstractControl<any, any, any>;
    email: AbstractControl<any, any, any>;
}

@Injectable({
    providedIn: 'root',
})
export class UserFormFactoryService {
    private readonly _fb = inject(FormBuilder);

    public editUserForm(
        data?: Partial<UserDetails>,
    ): FormGroup<EditFormControls> {
        /* @ts-expect-error: ... is not assignable to type ... */
        return this._fb.group({
            name: [data?.name || '', [Validators.required]],
            email: [data?.email || '', [Validators.required, Validators.email]],
        });
    }

    public editUserPasswordForm() {
        return this._fb.group(
            {
                password: [
                    '',
                    [Validators.required, strongPasswordValidator()],
                ],
                confirmPassword: ['', [Validators.required]],
            },
            {
                validators: [sameAsValidator('password', 'confirmPassword')],
            },
        );
    }
}
