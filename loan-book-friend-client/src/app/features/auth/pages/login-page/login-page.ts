import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorResponse, ValidationFieldError } from '@core/models';
import { AuthService } from '@core/services';
import { isRequired } from '@core/utils/formValidator.validator';
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

    fromValidationFieldError(key: string): any[] {
        if (!this.formErrorFields) {
            return [];
        }

        const el = this.formErrorFields.find((f) => f.field === key);
        if (!el) {
            return [];
        }

        return el.errors || [];
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
