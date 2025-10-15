import { HttpBackend, HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import {
    API_ROUTE_AUTH_LOGIN,
    API_ROUTE_AUTH_LOGOUT,
    API_ROUTE_AUTH_REFRESH_TOKEN,
    LOCAL_STORAGE,
    UserRole,
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

    private _tokenIat = signal<number | null>(null);
    public readonly tokenIat = this._tokenIat.asReadonly();

    private _refreshTokenIat = signal<number | null>(null);
    public readonly refreshTokenIat = this._refreshTokenIat.asReadonly();

    private _role = signal<UserRole | null>(null);
    public readonly role = this._role.asReadonly();

    constructor() {
        // Récupération du token dans le localstorage
        const strToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        if (strToken) {
            this._tokenIat.set(+strToken);
        }

        const strRefreshToken = localStorage.getItem(
            LOCAL_STORAGE.REFRESH_TOKEN,
        );
        if (strRefreshToken) {
            this._refreshTokenIat.set(+strRefreshToken);
        }

        const strRole = localStorage.getItem(LOCAL_STORAGE.ROLE);
        if (strRole) {
            this._role.set(strRole as UserRole);
        }

        effect(() => {
            console.log('Access token changed:', this._tokenIat());

            // lorsque le token est mis à jour, on met à jour le localstorage
            const t = this._tokenIat();

            if (t) {
                localStorage.setItem(LOCAL_STORAGE.TOKEN, t.toString());
            } else {
                localStorage.removeItem(LOCAL_STORAGE.TOKEN);
            }
        });

        effect(() => {
            console.log('Refresh token changed:', this._refreshTokenIat());

            // lorsque le refresh token est mis à jour, on met à jour le localstorage
            const rt = this._refreshTokenIat();

            if (rt) {
                localStorage.setItem(
                    LOCAL_STORAGE.REFRESH_TOKEN,
                    rt.toString(),
                );
            } else {
                localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
            }
        });

        effect(() => {
            console.log('Role changed:', this._role());

            // lorsque le role est mis à jour, on met à jour le localstorage
            const r = this._role();

            if (r) {
                localStorage.setItem(LOCAL_STORAGE.ROLE, r);
            } else {
                localStorage.removeItem(LOCAL_STORAGE.ROLE);
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
                        console.log(response);

                        this._tokenIat.set(response.tokenIat);
                        this._refreshTokenIat.set(response.refreshTokenIat);
                        this._role.set(response.role);
                    }),
                ),
        );
    }

    public refreshToken(): Promise<SignInResponse> {
        return firstValueFrom(
            new HttpClient(this._httpBackend)
                .post<SignInResponse>(
                    this._baseUrl + API_ROUTE_AUTH_REFRESH_TOKEN,
                    {},
                    {
                        withCredentials: true,
                    },
                )
                .pipe(
                    tap((response) => {
                        this._tokenIat.set(response.tokenIat);
                        this._refreshTokenIat.set(response.refreshTokenIat);
                        this._role.set(response.role);
                    }),
                ),
        );
    }

    public logout(): Promise<void> {
        this._tokenIat.set(null);
        this._refreshTokenIat.set(null);
        this._role.set(null);

        return firstValueFrom(
            new HttpClient(this._httpBackend).post<void>(
                this._baseUrl + API_ROUTE_AUTH_LOGOUT,
                {},
                {
                    withCredentials: true,
                },
            ),
        );
    }
}
