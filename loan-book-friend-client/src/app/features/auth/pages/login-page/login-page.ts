import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-login-page',
    imports: [],
    templateUrl: './login-page.html',
    styleUrl: './login-page.scss',
})
export class LoginPage implements OnDestroy {
    private readonly _fb = inject(FormBuilder);
    private readonly _authService = inject(AuthService);

    private _loginSubscription: Subscription | null = null;

    loginForm = this._fb.group({
        email: ['', [Validators.required, Validators.email]], // TODO validator email already used
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    ngOnDestroy(): void {
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
            this._loginSubscription = null;
        }
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this._loginSubscription = this._authService
                .loginEmail({
                    email: this.loginForm.value.email!,
                    password: this.loginForm.value.password!,
                })
                .subscribe({
                    next: (response: any) => {
                        console.log('Login successful', response);
                    },
                    error: (error: any) => {
                        console.error('Login failed', error);
                    },
                });
        }
    }
}
