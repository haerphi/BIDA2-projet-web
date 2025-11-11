import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants';
import { UserDetails, UserList } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    getConsumers(): Promise<UserDetails> {
        return firstValueFrom(
            this._httpClient.get<UserDetails>(
                this._baseUrl + ApiRoutes.user.consumers,
            ),
        );
    }

    getAllUsers(): Promise<UserList[]> {
        return firstValueFrom(
            this._httpClient.get<UserList[]>(
                this._baseUrl + ApiRoutes.user.all,
            ),
        );
    }

    getUserById(userId: string): Promise<UserDetails> {
        return firstValueFrom(
            this._httpClient.get<UserDetails>(
                this._baseUrl + ApiRoutes.user.byId + userId,
            ),
        );
    }

    deleteUser(userId?: string): Promise<void> {
        return firstValueFrom(
            this._httpClient.delete<void>(
                this._baseUrl + ApiRoutes.user.delete + (userId || ''),
            ),
        );
    }
}
