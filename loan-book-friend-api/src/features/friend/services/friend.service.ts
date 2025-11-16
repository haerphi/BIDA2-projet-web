import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from '../models';
import { Repository } from 'typeorm';
import { UserEntity } from 'features/user/models';
import { NotFoundException } from '@common/exceptions';
import { FriendRequest } from '../models/friend-request.model';

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
        fromYou?: boolean,
        // Optional pagination parameters
        page: number = 1,
        limit: number = 10,
        // Optional filters
        name?: string,
        email?: string,
    ): Promise<FriendRequest[]> {
        const query = this.friendRepository
            .createQueryBuilder('friendship')
            .leftJoinAndSelect('friendship.userA', 'userA')
            .leftJoinAndSelect('friendship.userB', 'userB')
            .where('friendship.acceptedAt IS NULL');

        if (fromYou != undefined) {
            if (fromYou) {
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

        if (name) {
            query.andWhere(
                '(userA.name ILIKE :name OR userB.name ILIKE :name)',
                { name: `%${name}%` },
            );
        }

        if (email) {
            query.andWhere(
                '(userA.email ILIKE :email OR userB.email ILIKE :email)',
                { email: `%${email}%` },
            );
        }

        query.skip((page - 1) * limit).take(limit);

        const friendships = await query.getMany();

        return friendships.map((friendship) => {
            return {
                fromYou: friendship.userA.user_id === userId,
                user:
                    friendship.userA.user_id === userId
                        ? friendship.userB
                        : friendship.userA,
            };
        });
    }

    async getFriends(
        userId: string,
        // Optional pagination parameters
        page: number = 1,
        limit: number = 10,
        // Optional filters
        name?: string,
        email?: string,
    ): Promise<UserEntity[]> {
        const query = this.friendRepository
            .createQueryBuilder('friendship')
            .leftJoinAndSelect('friendship.userA', 'userA')
            .leftJoinAndSelect('friendship.userB', 'userB')
            .where('(userA.user_id = :userId OR userB.user_id = :userId)', {
                userId,
            })
            .andWhere('friendship.acceptedAt IS NOT NULL');

        if (name) {
            query.andWhere(
                '(userA.name ILIKE :name OR userB.name ILIKE :name)',
                { name: `%${name}%` },
            );
        }

        if (email) {
            query.andWhere(
                '(userA.email ILIKE :email OR userB.email ILIKE :email)',
                { email: `%${email}%` },
            );
        }

        query.skip((page - 1) * limit).take(limit);

        const friendships = await query.getMany();

        const friends = friendships.map((friendship) => {
            if (friendship.userA.user_id === userId) {
                return friendship.userB;
            } else {
                return friendship.userA;
            }
        });

        return friends;
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
}
