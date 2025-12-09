import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import {
    ApiListResponse,
    FriendGetListDto,
    FriendGetListQueryDto,
    FriendRequestQueryDTO,
    ReceivedFriendRequestDto,
    SendFriendRequestFormDto,
    SentFriendRequestDto,
} from '@core/models';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FriendService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    async getFriends(
        query?: FriendGetListQueryDto,
    ): Promise<ApiListResponse<FriendGetListDto>> {
        return firstValueFrom(
            this._httpClient.get<ApiListResponse<FriendGetListDto>>(
                `${this._baseUrl}friend`,
                {
                    params: {
                        ...query,
                    },
                },
            ),
        );
    }

    async getSentFriendRequests(
        query?: FriendRequestQueryDTO,
    ): Promise<ApiListResponse<SentFriendRequestDto>> {
        return firstValueFrom(
            this._httpClient.get<ApiListResponse<SentFriendRequestDto>>(
                `${this._baseUrl}friend/sent-requests`,
                {
                    params: {
                        ...query,
                    },
                },
            ),
        );
    }

    async getReceivedFriendRequests(
        query?: FriendRequestQueryDTO,
    ): Promise<ApiListResponse<ReceivedFriendRequestDto>> {
        return firstValueFrom(
            this._httpClient.get<ApiListResponse<ReceivedFriendRequestDto>>(
                `${this._baseUrl}friend/received-requests`,
                {
                    params: {
                        ...query,
                    },
                },
            ),
        );
    }

    async sendFriendRequest(form: SendFriendRequestFormDto): Promise<void> {
        return firstValueFrom(
            this._httpClient.post<void>(`${this._baseUrl}friend`, form),
        );
    }

    async denyFriendRequest(senderId: string): Promise<void> {
        return firstValueFrom(
            this._httpClient.delete<void>(
                `${this._baseUrl}friend/deny-request/${senderId}`,
            ),
        );
    }

    async acceptFriendRequest(senderId: string): Promise<void> {
        return firstValueFrom(
            this._httpClient.patch<void>(
                `${this._baseUrl}friend/accept-request/${senderId}`,
                {},
            ),
        );
    }
}
