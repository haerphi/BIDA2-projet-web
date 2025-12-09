import { UserEntity } from '@user/models';

export class FriendWithCounts {
    user: UserEntity;
    loanCount: number;
    overdueCount: number;
}
