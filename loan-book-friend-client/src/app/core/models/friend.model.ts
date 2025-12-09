import { UserList } from '@core/models/user.model';
import { ApiPaginationQueryParams } from '@core/models/api.model';

export interface FriendGetListDto {
    user: UserList;
    loanCount: number;
    overdueCount: number;
}

export interface FriendGetListQueryDto extends ApiPaginationQueryParams {
    name?: string;
}

export interface SendFriendRequestFormDto {
    name?: string;
    email?: string;
}

export interface SentFriendRequestDto {
    receiver: UserList;
    sentAt: Date;
}

export interface ReceivedFriendRequestDto {
    sender: UserList;
    sentAt: Date;
}

export interface FriendRequestQueryDTO extends ApiPaginationQueryParams {
    name?: string;
}
