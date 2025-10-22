import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorResponse } from '@core/models';
import { BookService } from '@core/services';
import { fromValidationFieldError } from '@core/utils/validator.utils';
import { isRequired } from '@core/validators';
import { BookFormFactoryService } from '@features/books/services/book-form-factory.service';

@Component({
    selector: 'app-book-create-page',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './book-create-page.html',
    styleUrl: './book-create-page.scss',
})
export class BookCreatePage {
    protected readonly isRequired = isRequired;

    private readonly _bookFormFactory = inject(BookFormFactoryService);
    private readonly _bookService = inject(BookService);
    private readonly _router = inject(Router);

    bookForm = this._bookFormFactory.createBookForm();
    bookControls = this.bookForm.controls;

    isLoading = false;

    formErrorCode: string | null = null;
    formErrorFields: any[] | null | undefined = null;

    checkFormFieldError(key: string): any[] {
        if (!this.formErrorFields) {
            return [];
        }

        return fromValidationFieldError(this.formErrorFields, key);
    }

    async onSubmit(): Promise<void> {
        this.bookForm.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;
        this.isLoading = true;

        if (this.bookForm.valid) {
            try {
                await this._bookService.create({
                    title: this.bookForm.value.title!,
                    author: this.bookForm.value.author!,
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
