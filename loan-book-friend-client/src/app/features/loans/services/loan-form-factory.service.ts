import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';

@Injectable({
    providedIn: 'root',
})
export class LoanFormFactoryService {
    private readonly _fb = inject(FormBuilder);

    public createLoanForm() {
        return this._fb.group({
            bookId: [null, [Validators.required, Validators.minLength(8)]],
            borrowerId: [null, [Validators.required, Validators.minLength(8)]],
            returnDate: [dayjs().format('YYYY-MM-DD')],
        });
    }
}
