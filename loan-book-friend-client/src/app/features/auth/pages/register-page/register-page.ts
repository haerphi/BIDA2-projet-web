import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormInputDisplayError } from '@components/commons/form/display-error/display-error';
import { ApiErrorResponse } from '@core/models';
import { AuthService } from '@core/services';
import { AuthFormFactoryService } from '@features/auth/services/auth-form-factory.service';

@Component({
    selector: 'app-register-page',
    imports: [ReactiveFormsModule, FormsModule, FormInputDisplayError],
    templateUrl: './register-page.html',
    styleUrl: './register-page.scss',
})
export class RegisterPage {
    private readonly _authFormFactory = inject(AuthFormFactoryService);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    registerForm = this._authFormFactory.createRegisterForm();
    registerControls = this.registerForm.controls;

    isLoading = false;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    async onSubmit(): Promise<void> {
        this.registerForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.registerForm.valid) {
            this.isLoading = true;
            try {
                await this._authService.registerEmail({
                    name: this.registerForm.value.name!,
                    email: this.registerForm.value.email!,
                    password: this.registerForm.value.password!,
                });

                await this._router.navigate(['/auth']);
            } catch (err) {
                this.formErrorCode = (err as ApiErrorResponse).code;
                this.formErrorFields = (err as ApiErrorResponse).form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
