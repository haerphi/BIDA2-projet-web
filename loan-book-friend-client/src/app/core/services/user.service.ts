import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants';
import { UserList } from '@core/models';
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
            this._httpClient.get(this._baseUrl + ApiRoutes.user.consumers),
        );
    }

    getAllUsers(): Promise<UserList[]> {
        return firstValueFrom(
            this._httpClient.get<UserList[]>(
                this._baseUrl + ApiRoutes.user.all,
            ),
        );
    }
}
