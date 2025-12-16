import { Component, inject, input, OnChanges, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiErrorResponse, BookDetails } from '@core/models';
import { BookService } from '@core/services';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { hasSameAsError, isRequired } from '@core/validators';
import {
    BookFormFactoryService,
    EditBookFormControls,
} from '@features/books/services/book-form-factory.service';

@Component({
    selector: 'app-book-edit-form',
    imports: [ReactiveFormsModule],
    templateUrl: './book-edit-form.html',
    styleUrl: './book-edit-form.scss',
})
export class BookEditForm implements OnChanges {
    protected readonly isRequired = isRequired;
    protected readonly hasSameAsError = hasSameAsError;

    private readonly _bookFormFactory = inject(BookFormFactoryService);
    private readonly _bookService = inject(BookService);

    data = input<BookDetails | null>(null);
    bookUpdated = output<void>();

    isLoading = false;

    bookEditForm!: FormGroup<EditBookFormControls>;
    bookEditControls!: EditBookFormControls;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    checkFormFieldError(key: string): unknown[] {
        if (!this.formErrorFields) {
            return [];
        }

        return fromValidationFieldError(this.formErrorFields, key);
    }

    ngOnChanges(): void {
        this.bookEditForm = this._bookFormFactory.editBookForm(
            this.data() || {},
        );
        this.bookEditControls = this.bookEditForm.controls;
    }

    async onSubmit(): Promise<void> {
        this.bookEditForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.bookEditForm.valid) {
            this.isLoading = true;
            try {
                await this._bookService.updateBook(
                    this.bookEditForm.value,
                    this.data() ? this.data()!.bookId : '',
                );
                this.bookUpdated.emit();
            } catch (err) {
                this.formErrorCode = (err as ApiErrorResponse).code;
                this.formErrorFields = (err as ApiErrorResponse).form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
