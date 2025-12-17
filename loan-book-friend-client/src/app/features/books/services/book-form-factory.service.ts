/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import {
    AbstractControl,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms';
import { BookForm } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class BookFormFactoryService {
    private readonly _fb = inject(NonNullableFormBuilder);

    public bookForm(data?: Partial<BookForm>) {
        return this._fb.group({
            title: [data?.title, [Validators.required]],
            author: [data?.author, [Validators.required]],
            condition: [data?.condition, [Validators.required]],
        });
    }

    public editBookForm(data?: Partial<BookForm>) {
        return this._fb.group({
            title: [data?.title, [Validators.required]],
            author: [data?.author, [Validators.required]],
            condition: [data?.condition, [Validators.required]],
        });
    }
}
