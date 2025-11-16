/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import {
    AbstractControl,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms';
import { BookDetails, BookForm } from '@core/models';

export interface EditBookFormControls {
    title: AbstractControl<any, any, any>;
    author: AbstractControl<any, any, any>;
    available: AbstractControl<any, any, any>;
}

@Injectable({
    providedIn: 'root',
})
export class BookFormFactoryService {
    private readonly _fb = inject(NonNullableFormBuilder);

    public bookForm(data?: Partial<BookForm>) {
        return this._fb.group({
            title: [data?.title, [Validators.required]],
            author: [data?.author, [Validators.required]],
        });
    }

    public editBookForm(
        data?: Partial<BookDetails>,
    ): FormGroup<EditBookFormControls> {
        /* @ts-expect-error: ... is not assignable to type ... */
        return this._fb.group({
            title: [data?.title, [Validators.required]],
            author: [data?.author, [Validators.required]],
            available: [data?.available, [Validators.required]],
        });
    }
}
