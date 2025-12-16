import { Builder } from 'builder-pattern';
import { SentFriendRequestDto } from '@friend/dtos';
import { FriendEntity } from '@friend/models';
import { toUserListDto } from '@user/mappers';

export const friendEntityToSentFriendRequestDto = (
    friendEntity: FriendEntity,
): SentFriendRequestDto => {
    return Builder<SentFriendRequestDto>()
        .receiver(toUserListDto(friendEntity.userB))
        .sentAt(friendEntity.created_at)
        .build();
};
