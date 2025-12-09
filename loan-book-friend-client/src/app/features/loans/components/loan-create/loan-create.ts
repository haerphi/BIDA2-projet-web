import { Component, inject, output } from '@angular/core';
import { BookService, FriendService, LoanService } from '@core/services';
import { LoanFormFactoryService } from '@features/loans/services/loan-form-factory.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSelectAutocomplete } from '@components/commons/form/input-select-autocomplete/input-select-autocomplete';
import { InputSelectAutocompleteOption } from '@components/commons/form/input-select-autocomplete/models';
import { BookAvailability } from '@core/constants';
import { CreateLoanForm } from '@core/models';

@Component({
    selector: 'app-loan-create',
    imports: [ReactiveFormsModule, InputSelectAutocomplete],
    templateUrl: './loan-create.html',
    styleUrl: './loan-create.scss',
})
export class LoanCreate {
    private readonly _lff = inject(LoanFormFactoryService);
    private readonly _friendService = inject(FriendService);
    private readonly _bookService = inject(BookService);
    private readonly _loanService = inject(LoanService);

    createLoan = output<CreateLoanForm>();

    form = this._lff.createLoanForm();
    controls = this.form.controls;

    friendOptions: InputSelectAutocompleteOption[] = [];
    bookOptions: InputSelectAutocompleteOption[] = [];

    onFriendNameChange(value: string) {
        this._friendService
            .getFriends({
                name: value,
            })
            .then((response) => {
                this.friendOptions = response.data.map((f) => ({
                    value: f.user.userId,
                    label: f.user.name,
                    disabled: false,
                }));
            });
    }

    onBookTitleChange(value: string) {
        this._bookService
            .getAllOwnedBooks({
                title: value,
            })
            .then((response) => {
                this.bookOptions = response.data.map((b) => {
                    let label = b.title;
                    const disabled =
                        b.availability !== BookAvailability.Available;

                    if (b.availability !== BookAvailability.Available) {
                        label += ' (déjà prêté)';
                    }

                    return {
                        value: b.bookId,
                        label: label,
                        disabled,
                    };
                });
            });
    }

    onSubmit() {
        if (this.form.valid) {
            this.createLoan.emit({
                borrowerId: this.controls.borrowerId.value!,
                bookId: this.controls.bookId.value!,
                returnDate: this.controls.returnDate.value
                    ? new Date(this.controls.returnDate.value)
                    : null,
            });
        }
    }
}
