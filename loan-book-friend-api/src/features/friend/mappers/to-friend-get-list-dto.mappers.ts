import { FriendWithCounts } from '@friend/models/friend-with-counts.model';
import { FriendGetListDto } from '@friend/dtos';
import { Builder } from 'builder-pattern';
import { toUserListDto } from '@user/mappers';

export const friendWithCountsToFriendGetListDto = (
    friendWithCounts: FriendWithCounts,
): FriendGetListDto => {
    return Builder<FriendGetListDto>()
        .user(toUserListDto(friendWithCounts.user))
        .loanCount(friendWithCounts.loanCount)
        .overdueCount(friendWithCounts.overdueCount)
        .build();
};
