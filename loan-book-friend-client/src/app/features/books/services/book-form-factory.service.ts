import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BookCreate } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class BookFormFactoryService {
    private readonly _fb = inject(NonNullableFormBuilder);

    public createBookForm(data?: Partial<BookCreate>) {
        return this._fb.group({
            title: [data?.title, [Validators.required]],
            author: [data?.author, [Validators.required]],
        });
    }
}
