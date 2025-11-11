import { NotFoundException } from '@common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../models';
import { Repository } from 'typeorm';
import { UserEntity } from 'features/user/models';
import { UserRole } from 'features/security/enums';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    async create(book: BookEntity): Promise<BookEntity> {
        return this.bookRepository.save(book);
    }

    async delete(id: string): Promise<void> {
        await this.bookRepository.delete({ book_id: id });
    }

    async findAll(): Promise<BookEntity[]> {
        return this.bookRepository
            .createQueryBuilder('book')
            .select(['book.title', 'book.author'])
            .distinctOn(['book.title', 'book.author'])
            .orderBy('book.title', 'ASC')
            .addOrderBy('book.author', 'ASC')
            .getMany();
    }

    async findAllByOwnerId(ownerId: string): Promise<BookEntity[]> {
        return this.bookRepository.find({
            where: { owner: { user_id: ownerId } },
        });
    }

    async deleteById(id: string, user: UserEntity): Promise<void> {
        // find the book by id and owner id
        const book = await this.bookRepository.findOne({
            relations: { owner: true },
            where: { book_id: id },
        });

        // check if the user is admin or the owner of the book
        if (user.role !== UserRole.Admin) {
            if (!book || book.owner.user_id !== user.user_id) {
                throw new NotFoundException('book_not_found');
            }
        }

        // delete the book
        await this.bookRepository.delete({ book_id: id });
    }
}
