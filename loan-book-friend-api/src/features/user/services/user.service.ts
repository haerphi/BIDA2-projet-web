import { NotFoundException } from '@common/exceptions';
import {
    EmailAlreadyExistException,
    NameAlreadyExistException,
} from '@common/exceptions/user.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(user: UserEntity): Promise<UserEntity> {
        // check if email already exists
        await this.verifyEmailNotTaken(user.email);

        // check if name already exists
        await this.verifyNameNotTaken(user.name);

        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        // check if the user exists
        await this.findById(id);

        // delete the user
        await this.userRepository.delete({ user_id: id });
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({ email });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ user_id: id });
        if (!user) {
            throw new NotFoundException('user_not_found');
        }
        return user;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const existingUser = await this.findById(id);

        // check if email is being updated and if it already exists
        if (data.email && data.email !== existingUser.email) {
            await this.verifyEmailNotTaken(data.email);
        }

        // check if name is being updated and if it already exists
        if (data.name && data.name !== existingUser.name) {
            await this.verifyNameNotTaken(data.name);
        }

        const updatedUser: UserEntity = {
            ...existingUser,
            email: data.email ?? existingUser.email,
            name: data.name ?? existingUser.name,
            role: data.role ?? existingUser.role,
        };
        await this.userRepository.save(updatedUser);

        return updatedUser;
    }

    private async verifyEmailNotTaken(email: string): Promise<void> {
        const emailUser = await this.userRepository.findOneBy({
            email,
        });
        if (emailUser) {
            throw new EmailAlreadyExistException();
        }
    }

    private async verifyNameNotTaken(name: string): Promise<void> {
        const nameUser = await this.userRepository.findOneBy({
            name,
        });
        if (nameUser) {
            throw new NameAlreadyExistException();
        }
    }
}
