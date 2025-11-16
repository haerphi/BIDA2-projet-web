import { UserEntity } from '@user/models';

export interface FriendRequest {
    fromYou: boolean;
    user: UserEntity;
}
