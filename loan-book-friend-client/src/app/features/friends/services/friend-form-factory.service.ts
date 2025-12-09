import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FriendFormFactoryService {
    private readonly _fb = inject(FormBuilder);

    public sendFriendRequestForm() {
        return this._fb.group({
            name: [''],
            email: ['', [Validators.email]],
        });
    }
}
