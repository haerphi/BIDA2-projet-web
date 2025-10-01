import { HttpBackend, HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import {
    API_ROUTE_AUTH_LOGIN,
    API_ROUTE_AUTH_REFRESH_TOKEN,
    LOCAL_STORAGE_TOKEN,
} from '@core/constants';
import { CredentialEmail, SignInResponse } from '@core/models';
import { environment } from '@env';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _httpClient = inject(HttpClient);
    // Pour éviter les boucles infinies lors de la requête de refresh token
    private readonly _httpBackend = inject(HttpBackend);

    private readonly _baseUrl = environment.apiUrl;

    private _token = signal<string | null>(null);
    public readonly token = this._token.asReadonly();

    private _refreshToken = signal<string | null>(null);

    constructor() {
        // Récupération du token dans le localstorage
        const strToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        if (strToken) {
            this._token.set(strToken);
        }

        effect(() => {
            // lorsque le token est mis à jour, on met à jour le localstorage
            const t = this._token();

            if (t) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, t);
            } else {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            }
        });
    }

    public loginEmail(credential: CredentialEmail): Promise<SignInResponse> {
        return firstValueFrom(
            this._httpClient
                .post<SignInResponse>(
                    this._baseUrl + API_ROUTE_AUTH_LOGIN,
                    credential,
                )
                .pipe(
                    tap((response) => {
                        this._token.set(response.token);
                        this._refreshToken.set(response.refreshToken);
                    }),
                ),
        );
    }

    public refreshToken(): Promise<SignInResponse> {
        return firstValueFrom(
            new HttpClient(this._httpBackend)
                .post<SignInResponse>(
                    this._baseUrl + API_ROUTE_AUTH_REFRESH_TOKEN,
                    {
                        refresh: this._refreshToken(),
                    },
                )
                .pipe(
                    tap((response) => {
                        this._token.set(response.token);
                        this._refreshToken.set(response.refreshToken);
                    }),
                ),
        );
    }

    public logout(): void {
        this._token.set('');
        this._refreshToken.set('');
    }
}
