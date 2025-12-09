import { Builder } from 'builder-pattern';
import { ReceivedFriendRequestDto } from '@friend/dtos';
import { FriendEntity } from '@friend/models';
import { toUserListDto } from '@user/mappers';

export const friendEntityToReceivedFriendRequestDto = (
    friendEntity: FriendEntity,
): ReceivedFriendRequestDto => {
    return Builder<ReceivedFriendRequestDto>()
        .sender(toUserListDto(friendEntity.userA))
        .sentAt(friendEntity.created_at)
        .build();
};
