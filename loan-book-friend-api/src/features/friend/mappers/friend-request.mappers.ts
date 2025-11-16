import { toUserListDto } from 'features/user/mappers';
import { FriendRequestDto } from '../dtos/friend-request.dto';
import { FriendRequest } from '../models/friend-request.model';

export const ToFriendRequestDto = (
    friendRequest: FriendRequest,
): FriendRequestDto => {
    return {
        fromYou: friendRequest.fromYou,
        user: toUserListDto(friendRequest.user),
    };
};
