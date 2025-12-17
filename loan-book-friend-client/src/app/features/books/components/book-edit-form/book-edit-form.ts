import { Component, inject, input, OnChanges, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiErrorResponse, BookDetails } from '@core/models';
import { BookService } from '@core/services';
import { BookFormFactoryService } from '@features/books/services/book-form-factory.service';
import { FormInputDisplayError } from '@components/commons/form/display-error/display-error';
import { Spinner } from '@components/commons/loadings/spinner/spinner';

@Component({
    selector: 'app-book-edit-form',
    imports: [ReactiveFormsModule, FormInputDisplayError, Spinner],
    templateUrl: './book-edit-form.html',
    styleUrl: './book-edit-form.scss',
})
export class BookEditForm implements OnChanges {
    private readonly _bff = inject(BookFormFactoryService);
    private readonly _bookService = inject(BookService);

    data = input<BookDetails | null>(null);
    bookUpdated = output<void>();

    isLoading = false;

    form = this._bff.editBookForm();
    controls = this.form.controls;

    formErrorCode: string | null = null;
    formErrorFields: unknown[] | null | undefined = null;

    ngOnChanges(): void {
        this.form = this._bff.editBookForm(this.data() || {});
        this.controls = this.form.controls;
    }

    async onSubmit(): Promise<void> {
        this.form.markAllAsTouched();
        this.formErrorCode = null;
        this.formErrorFields = null;

        if (this.form.valid) {
            this.isLoading = true;
            try {
                await this._bookService.updateBook(
                    this.form.value,
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
