import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorResponse, ValidationFieldError } from '@core/models';
import { AuthService } from '@core/services';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { isRequired } from '@core/validators';
import { AuthFormFactoryService } from '@features/auth/services/auth-form-factory.service';

@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './login-page.html',
    styleUrl: './login-page.scss',
})
export class LoginPage {
    protected readonly isRequired = isRequired;

    private readonly _authFormFactory = inject(AuthFormFactoryService);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    loginForm = this._authFormFactory.createLoginForm();
    loginControls = this.loginForm.controls;

    isLoading = false;

    formErrorCode: string | null = null;
    formErrorFields: ValidationFieldError[] | null | undefined = null;

    checkFormFieldError(key: string): any[] {
        console.log(key, this.formErrorFields);
        if (!this.formErrorFields) {
            return [];
        }

        return fromValidationFieldError(this.formErrorFields, key);
    }

    async onSubmit(): Promise<void> {
        this.loginForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;
        this.isLoading = true;

        if (this.loginForm.valid) {
            try {
                await this._authService.loginEmail({
                    email: this.loginForm.value.email!,
                    password: this.loginForm.value.password!,
                });

                await this._router.navigate(['/']);
            } catch (err) {
                this.formErrorCode = (err as ApiErrorResponse).code;
                this.formErrorFields = (err as ApiErrorResponse).form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
