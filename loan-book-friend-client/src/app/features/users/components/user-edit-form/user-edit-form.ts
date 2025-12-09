import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiErrorResponse, UserDetails } from '@core/models';
import { UserService } from '@core/services';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { hasSameAsError, isRequired } from '@core/validators';
import {
    EditFormControls,
    UserFormFactoryService,
} from '@features/users/services/user-form-factory.service';

@Component({
    selector: 'app-user-edit-form',
    imports: [ReactiveFormsModule],
    templateUrl: './user-edit-form.html',
    styleUrl: './user-edit-form.scss',
})
export class UserEditForm implements OnInit {
    protected readonly isRequired = isRequired;
    protected readonly hasSameAsError = hasSameAsError;

    private readonly _authFormFactory = inject(UserFormFactoryService);
    private readonly _userService = inject(UserService);

    data = input.required<UserDetails>();
    self = input<boolean>(false);
    profileUpdated = output<void>();

    isLoading = false;

    userEditForm!: FormGroup<EditFormControls>;
    userEditControls!: EditFormControls;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    ngOnInit(): void {
        this.userEditForm = this._authFormFactory.editUserForm(this.data());
        this.userEditControls = this.userEditForm.controls;
    }

    checkFormFieldError(key: string): unknown[] {
        if (!this.formErrorFields) {
            return [];
        }

        return fromValidationFieldError(this.formErrorFields, key);
    }

    async onSubmit(): Promise<void> {
        this.userEditForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.userEditForm.valid) {
            this.isLoading = true;
            try {
                await this._userService.updateUser(
                    this.userEditForm.value,
                    this.self() ? null : this.data().userId,
                );
                this.profileUpdated.emit();
            } catch (err) {
                this.formErrorCode = (err as ApiErrorResponse).code;
                this.formErrorFields = (err as ApiErrorResponse).form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
