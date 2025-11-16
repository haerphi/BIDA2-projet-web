import { toUserListDto } from 'features/user/mappers';
import { FriendRequestDto } from '@friend/dtos';
import { FriendRequest } from '@friend/models';

export const ToFriendRequestDto = (
    friendRequest: FriendRequest,
): FriendRequestDto => {
    return {
        fromYou: friendRequest.fromYou,
        user: toUserListDto(friendRequest.user),
    };
};
