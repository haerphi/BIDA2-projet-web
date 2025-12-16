import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputDisplayError } from '@components/commons/form/display-error/display-error';
import { ApiErrorResponse } from '@core/models';
import { BookService } from '@core/services';
import { BookFormFactoryService } from '@features/books/services/book-form-factory.service';
import { Spinner } from '@components/commons/loadings/spinner/spinner';

@Component({
    selector: 'app-book-create',
    imports: [ReactiveFormsModule, FormInputDisplayError, Spinner],
    templateUrl: './book-create.html',
    styleUrl: './book-create.scss',
})
export class BookCreate {
    private readonly _bff = inject(BookFormFactoryService);
    private readonly _bookService = inject(BookService);

    bookCreated = output<void>();

    form = this._bff.bookForm();
    controls = this.form.controls;

    isLoading = false;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    async onSubmit(): Promise<void> {
        this.form.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.form.valid) {
            this.isLoading = true;
            try {
                await this._bookService.create({
                    title: this.controls.title.value!,
                    author: this.controls.author.value!,
                    condition: this.controls.condition.value!,
                });

                this.form.reset();
                this.bookCreated.emit();
            } catch (err) {
                const error = err as ApiErrorResponse;
                this.formErrorCode = error.code;
                this.formErrorFields = error.form;
            } finally {
                this.isLoading = false;
            }
        }
    }
}
