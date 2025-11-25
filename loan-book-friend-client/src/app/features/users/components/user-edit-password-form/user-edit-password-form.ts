import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiErrorResponse } from '@core/models';
import { AuthService } from '@core/services';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { hasSameAsError, isRequired } from '@core/validators';
import {
    EditPasswordFormControls,
    UserFormFactoryService,
} from '@features/users/services/user-form-factory.service';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-user-edit-password-form',
    imports: [ReactiveFormsModule, LoadingModal, NgClass],
    templateUrl: './user-edit-password-form.html',
    styleUrl: './user-edit-password-form.scss',
})
export class UserEditPasswordForm implements OnInit {
    protected readonly isRequired = isRequired;
    protected readonly hasSameAsError = hasSameAsError;

    private readonly _authFormFactory = inject(UserFormFactoryService);
    private readonly _authService = inject(AuthService);

    userId = input<string | null>(null);
    passwordUpdated = output<void>();

    isLoading = false;

    passwordForm!: FormGroup<EditPasswordFormControls>;
    passwordFormControls!: EditPasswordFormControls;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    checkFormFieldError(key: string): unknown[] {
        if (!this.formErrorFields) {
            return [];
        }

        return fromValidationFieldError(this.formErrorFields, key);
    }

    ngOnInit(): void {
        this.passwordForm = this._authFormFactory.editUserPasswordForm();
        this.passwordFormControls = this.passwordForm.controls;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(event: any): void {
        if (this.userId()) {
            this.passwordFormControls.oldPassword.setValue(
                event.target.value as string,
            );
        }
    }

    async onSubmit(): Promise<void> {
        this.passwordForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.passwordForm.valid) {
            this.isLoading = true;
            try {
                // call authService to update password
                await this._authService.changePassword(
                    this.userId(),
                    this.userId() ? null : this.passwordForm.value.oldPassword!,
                    this.passwordForm.value.newPassword!,
                );
                this.passwordUpdated.emit();
            } catch (err) {
                this.formErrorCode = (err as ApiErrorResponse).code;
                this.formErrorFields = (err as ApiErrorResponse).form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
