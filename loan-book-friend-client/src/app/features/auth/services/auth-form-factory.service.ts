import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CredentialEmail, RegisterForm } from '@core/models';
import { sameAsValidator, strongPasswordValidator } from '@core/validators';

@Injectable({
    providedIn: 'root',
})
export class AuthFormFactoryService {
    private readonly _fb = inject(NonNullableFormBuilder);

    public createLoginForm(data?: Partial<CredentialEmail>) {
        return this._fb.group({
            email: [data?.email, [Validators.required, Validators.email]],
            password: [data?.password, [Validators.required]],
        });
    }

    public createRegisterForm(
        data?: Partial<RegisterForm & { confirmPassword: string }>,
    ) {
        return this._fb.group(
            {
                name: [data?.name, [Validators.required]], // TODO validator name already used
                email: [data?.email, [Validators.required, Validators.email]], // TODO validator email already used
                password: [
                    data?.password,
                    [Validators.required, strongPasswordValidator()],
                ],
                confirmPassword: [data?.confirmPassword, [Validators.required]],
            },
            {
                validators: [sameAsValidator('password', 'confirmPassword')],
            },
        );
    }
}
