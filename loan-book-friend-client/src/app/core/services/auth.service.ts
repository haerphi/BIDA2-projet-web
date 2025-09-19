import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ROUTE_AUTH_LOGIN } from '@core/constants';
import { environment } from '../../../environments/environment';
import { CredentialEmail } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    public loginEmail(credential: CredentialEmail) {
        return this._httpClient.post(
            this._baseUrl + API_ROUTE_AUTH_LOGIN,
            credential,
        );
    }
}
