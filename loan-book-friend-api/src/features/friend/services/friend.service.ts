import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from '@friend/models';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/models';
import { NotFoundException } from '@common/exceptions';
import { FriendRequest } from '@friend/models/friend-request.model';
import { executePagination } from '@common/utils/repository.utils';
import { FriendGetQueryDto, FriendRequestGetQueryDto } from '@friend/dtos';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendEntity)
        private readonly friendRepository: Repository<FriendEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async addFriendByEmail(
        requesterId: string,
        friendEmail: string,
    ): Promise<FriendEntity> {
        const friend = await this.userRepository.findOne({
            where: { email: friendEmail },
        });

        if (!friend) {
            throw new NotFoundException('user_not_found');
        }

        const friendship = this.friendRepository.create({
            userA: { user_id: requesterId },
            userB: friend,
        });

        return this.friendRepository.save(friendship);
    }

    async addFriendByName(
        requesterId: string,
        friendName: string,
    ): Promise<FriendEntity> {
        const friend = await this.userRepository.findOne({
            where: { name: friendName },
        });

        if (!friend) {
            throw new NotFoundException('user_not_found');
        }

        const friendship = this.friendRepository.create({
            userA: { user_id: requesterId },
            userB: friend,
        });

        return this.friendRepository.save(friendship);
    }

    async acceptFriend(
        userId: string,
        friendId: string,
    ): Promise<FriendEntity> {
        console.log('=====================');

        const friendship = await this.friendRepository.findOne({
            where: {
                userA: { user_id: friendId },
                userB: { user_id: userId },
            },
            relations: ['userA', 'userB'],
        });

        if (!friendship) {
            throw new NotFoundException('friendship_not_found');
        }

        if (friendship.acceptedAt) {
            return friendship; // already accepted
        }

        friendship.acceptedAt = new Date();
        return this.friendRepository.save(friendship);
    }

    async getFriendRequests(
        userId: string,
        filters: FriendRequestGetQueryDto,
    ): Promise<{ requests: FriendRequest[]; total: number }> {
        const query = this.friendRepository
            .createQueryBuilder('friendship')
            .leftJoinAndSelect('friendship.userA', 'userA')
            .leftJoinAndSelect('friendship.userB', 'userB')
            .where('friendship.acceptedAt IS NULL');

        if (filters.fromYou != undefined) {
            if (filters.fromYou) {
                query.andWhere('userA.user_id = :userId', { userId });
            } else {
                query.andWhere('userB.user_id = :userId', { userId });
            }
        } else {
            query.andWhere(
                '(userA.user_id = :userId OR userB.user_id = :userId)',
                { userId },
            );
        }

        if (filters.name) {
            query.andWhere(
                '(userA.name ILIKE :name OR userB.name ILIKE :name)',
                { name: `%${filters.name}%` },
            );
        }

        if (filters.email) {
            query.andWhere(
                '(userA.email ILIKE :email OR userB.email ILIKE :email)',
                { email: `%${filters.email}%` },
            );
        }

        const [total, friendships] = await Promise.all(
            executePagination<FriendEntity>(query, filters),
        );

        return {
            total,
            requests: friendships.map((friendship) => {
                return {
                    fromYou: friendship.userA.user_id === userId,
                    user:
                        friendship.userA.user_id === userId
                            ? friendship.userB
                            : friendship.userA,
                };
            }),
        };
    }

    async getFriends(
        userId: string,
        filters: FriendGetQueryDto,
    ): Promise<{ friends: UserEntity[]; total: number }> {
        const query = this.friendRepository
            .createQueryBuilder('friendship')
            .leftJoinAndSelect('friendship.userA', 'userA')
            .leftJoinAndSelect('friendship.userB', 'userB')
            .where('(userA.user_id = :userId OR userB.user_id = :userId)', {
                userId,
            })
            .andWhere('friendship.acceptedAt IS NOT NULL');

        if (filters.name) {
            query.andWhere(
                '(userA.name ILIKE :name OR userB.name ILIKE :name)',
                { name: `%${filters.name}%` },
            );
        }

        if (filters.email) {
            query.andWhere(
                '(userA.email ILIKE :email OR userB.email ILIKE :email)',
                { email: `%${filters.email}%` },
            );
        }

        const [total, friendships] = await Promise.all(
            executePagination<FriendEntity>(query, filters),
        );

        const friends = friendships.map((friendship) => {
            if (friendship.userA.user_id === userId) {
                return friendship.userB;
            } else {
                return friendship.userA;
            }
        });

        return { friends, total };
    }

    async removeFriend(requesterId: string, friendId: string): Promise<void> {
        const friendship = await this.friendRepository.findOne({
            where: [
                {
                    userA: { user_id: requesterId },
                    userB: { user_id: friendId },
                },
                {
                    userA: { user_id: friendId },
                    userB: { user_id: requesterId },
                },
            ],
            relations: ['userA', 'userB'],
        });

        if (!friendship) {
            throw new NotFoundException('friendship_not_found');
        }

        await this.friendRepository.remove(friendship);
    }

    async isFriend(userId: string, friendId: string): Promise<boolean> {
        const friendship = await this.friendRepository.findOne({
            where: [
                {
                    userA: { user_id: userId },
                    userB: { user_id: friendId },
                },
                {
                    userA: { user_id: friendId },
                    userB: { user_id: userId },
                },
            ],
            relations: ['userA', 'userB'],
        });

        return !!friendship && !!friendship.acceptedAt;
    }
}
