import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from '@friend/models';
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from 'typeorm';
import { UserEntity } from '@user/models';
import { NotFoundException } from '@common/exceptions';
import { Builder } from 'builder-pattern';
import { PaginationQueryDto } from '@common/dtos';
import { FriendGetListQueryDto } from '@friend/dtos';
import { FriendWithCounts } from '@friend/models/friend-with-counts.model';
import { LoanService } from '@loan/services';
import { LoanEntity } from '@loan/models';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendEntity)
        private readonly friendRepository: Repository<FriendEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => LoanService))
        private readonly loanService: LoanService,
    ) {}

    async sendFriendRequest(
        requesterId: string,
        name: string,
        email: string,
    ): Promise<FriendEntity> {
        // check if the requsterId exists
        const requester = await this.userRepository.findOne({
            where: { userId: requesterId },
        });
        if (!requester) {
            throw new NotFoundException();
        }

        // check if the user with the provided name or email exists
        let recipient: UserEntity | null = null;
        if (email) {
            recipient = await this.userRepository.findOne({
                where: { email },
            });
        } else if (name) {
            recipient = await this.userRepository.findOne({
                where: { name },
            });
        }

        if (!recipient) {
            throw new NotFoundException();
        }

        // create a new friend request
        let friendRequest = Builder<FriendEntity>()
            .userA(requester)
            .userB(recipient)
            .build();
        friendRequest = await this.friendRepository.save(friendRequest);
        return friendRequest;
    }

    async getFriendRequestsSent(
        requesterId: string,
        filters: PaginationQueryDto,
    ): Promise<{
        total: number;
        friendRequests: FriendEntity[];
    }> {
        const where = {
            userA: { userId: requesterId },
            acceptedAt: IsNull(),
        };

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const friendRequestsPromise = this.friendRepository.find({
            where,
            relations: {
                userB: true,
            },
            skip,
            take,
        });

        const totalPromise = this.friendRepository.count({ where });

        const [friendRequests, total] = await Promise.all([
            friendRequestsPromise,
            totalPromise,
        ]);

        return { total, friendRequests };
    }

    async getFriendRequestsReceived(
        recipientId: string,
        filters: PaginationQueryDto,
    ): Promise<{
        total: number;
        friendRequests: FriendEntity[];
    }> {
        const where = {
            userB: { userId: recipientId },
            acceptedAt: IsNull(),
        };

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const friendRequestsPromise = this.friendRepository.find({
            where,
            relations: {
                userA: true,
            },
            skip,
            take,
        });

        const totalPromise = this.friendRepository.count({ where });

        const [friendRequests, total] = await Promise.all([
            friendRequestsPromise,
            totalPromise,
        ]);

        return { total, friendRequests };
    }

    async denyFriendRequest(
        requesterId: string,
        friendId: string,
    ): Promise<void> {
        const where: FindOptionsWhere<FriendEntity>[] = [
            {
                acceptedAt: IsNull(),
                userA: { userId: friendId },
                userB: { userId: requesterId },
            },
            {
                acceptedAt: IsNull(),
                userA: { userId: requesterId },
                userB: { userId: friendId },
            },
        ];

        const friendRequest = await this.friendRepository.findOne({
            where,
        });

        if (!friendRequest) {
            throw new NotFoundException();
        }

        await this.friendRepository.remove(friendRequest);
    }

    async acceptFriendRequest(
        requesterId: string,
        senderId: string,
    ): Promise<void> {
        const where = {
            acceptedAt: IsNull(),
            userA: { userId: senderId },
            userB: { userId: requesterId },
        };

        const friendRequest = await this.friendRepository.findOne({
            where,
        });

        if (!friendRequest) {
            throw new NotFoundException();
        }

        friendRequest.acceptedAt = new Date();

        await this.friendRepository.save(friendRequest);
    }

    async getFriends(
        userId: string,
        filters: FriendGetListQueryDto,
    ): Promise<{
        total: number;
        friends: FriendWithCounts[];
    }> {
        const where: FindOptionsWhere<FriendEntity>[] = [];

        const userAWhere = {
            userA: { userId },
            acceptedAt: Not(IsNull()),
        };
        const userBWhere = { userB: { userId }, acceptedAt: Not(IsNull()) };

        if (filters.name) {
            Object.assign(userAWhere, {
                userB: { name: ILike(filters.name + '%') },
            });
            Object.assign(userBWhere, {
                userA: { name: ILike(filters.name + '%') },
            });
        }

        where.push(userAWhere, userBWhere);

        // Pagination
        const skip = filters.page * filters.limit - filters.limit; // because page starts at 1
        const take = filters.limit;

        const order = {};
        if (filters.orderBy) {
            order[filters.orderBy] = filters.orderDirection || 'ASC';
        }

        const friendsPromise = this.friendRepository.find({
            where,
            relations: {
                userA: true,
                userB: true,
            },
            skip,
            take,
        });

        const totalPromise = this.friendRepository.count({ where });

        const [friends, total] = await Promise.all([
            friendsPromise,
            totalPromise,
        ]);

        // Find all the loans between the user and each friend to calculate loanCount and overdueCount
        const promises = friends.map((f): Promise<LoanEntity[]> => {
            const friendUser = f.userA.userId === userId ? f.userB : f.userA;
            return this.loanService.getActiveLoansByUser(
                friendUser.userId,
                userId,
            );
        });

        const loansByFriend = await Promise.all(promises);

        const friendsWithCounts: FriendWithCounts[] = friends.map(
            (f, index) => {
                const friendUser =
                    f.userA.userId === userId ? f.userB : f.userA;
                const loans = loansByFriend[index];

                const loanCount = loans.length;
                const overdueCount = loans.filter(
                    (loan) =>
                        loan.shouldBeReturnedAt &&
                        loan.shouldBeReturnedAt < new Date(),
                ).length;

                return Builder<FriendWithCounts>()
                    .user(friendUser)
                    .loanCount(loanCount)
                    .overdueCount(overdueCount)
                    .build();
            },
        );

        return { total, friends: friendsWithCounts };
    }

    async areFriends(user1: string, user2: string): Promise<boolean> {
        const where: FindOptionsWhere<FriendEntity>[] = [
            {
                userA: { userId: user1 },
                userB: { userId: user2 },
                acceptedAt: Not(IsNull()),
            },
            {
                userA: { userId: user2 },
                userB: { userId: user1 },
                acceptedAt: Not(IsNull()),
            },
        ];

        const friendRelation = await this.friendRepository.findOne({
            where,
        });

        return !!friendRelation;
    }
}
