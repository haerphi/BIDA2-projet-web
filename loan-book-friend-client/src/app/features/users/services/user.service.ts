import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ROUTE_USER_CONSUMERS } from '@core/constants';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    getConsumers(): Promise<any> {
        return firstValueFrom(
            this._httpClient.get(this._baseUrl + API_ROUTE_USER_CONSUMERS),
        );
    }
}
