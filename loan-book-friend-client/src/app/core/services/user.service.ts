import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import {
    ApiListResponse,
    UserListQueryParams,
    UserListWithRole,
} from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    getAllUsers(
        queryParams?: UserListQueryParams,
    ): Promise<ApiListResponse<UserListWithRole>> {
        return firstValueFrom(
            this._httpClient.get<ApiListResponse<UserListWithRole>>(
                `${this._baseUrl}user/all`,
                {
                    params: { ...queryParams },
                },
            ),
        );
    }

    getUserById(userId: string): Promise<any> {
        return firstValueFrom(
            this._httpClient.get<any>(`${this._baseUrl}user/${userId}`),
        );
    }

    deleteUser(userId: string): Promise<void> {
        return firstValueFrom(
            this._httpClient.delete<void>(`${this._baseUrl}user/${userId}`),
        );
    }
}
