import {
    EmailAlreadyExistException,
    NameAlreadyExistException,
} from '@common/exceptions/user.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<User> {
        // check if email already exists
        const existingUser = await this.userRepository.findOneBy({
            email: user.email,
        });
        if (existingUser) {
            throw new EmailAlreadyExistException();
        }

        // check if name already exists
        const existingName = await this.userRepository.findOneBy({
            name: user.name,
        });
        if (existingName) {
            throw new NameAlreadyExistException();
        }

        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete({ user_id: id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }
}
