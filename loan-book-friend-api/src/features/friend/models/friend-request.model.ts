import { UserEntity } from 'features/user/models';

export interface FriendRequest {
    fromYou: boolean;
    user: UserEntity;
}
