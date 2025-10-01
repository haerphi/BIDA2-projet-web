import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CredentialEmail } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class AuthFormFactoryService {
    private readonly _fb = inject(NonNullableFormBuilder);

    public createLoginForm(data?: Partial<CredentialEmail>) {
        return this._fb.group({
            email: [data?.email, [Validators.required, Validators.email]], // TODO validator email already used
            password: [data?.password, [Validators.required]], // TODO password validator with regex to get strong
        });
    }
}
