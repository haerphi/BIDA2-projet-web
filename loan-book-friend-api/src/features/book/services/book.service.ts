import { NotFoundException } from '@common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '@book/models';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/models';
import { UserRole } from '@security/enums';

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

    async findById(id: string, requester: UserEntity) {
        const book = await this.bookRepository.findOne({
            where: { book_id: id },
            relations: { owner: true },
        });

        if (!book) {
            throw new NotFoundException('book_not_found');
        }

        // If the requester is not admin and not the owner, restrict access
        if (
            requester.role !== UserRole.Admin &&
            book.owner.user_id !== requester.user_id
        ) {
            throw new NotFoundException('book_not_found');
        }

        return book;
    }

    async update(
        id: string,
        bookData: Partial<BookEntity>,
        user: UserEntity,
    ): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({
            where: { book_id: id },
            relations: { owner: true },
        });

        if (!book) {
            throw new NotFoundException('book_not_found');
        }

        // If the requester is not admin and not the owner, restrict access
        if (
            user.role !== UserRole.Admin &&
            book.owner.user_id !== user.user_id
        ) {
            throw new NotFoundException('book_not_found');
        }

        const updatedBook: BookEntity = {
            ...book,
            title: bookData.title ?? book.title,
            author: bookData.author ?? book.author,
            available: bookData.available ?? book.available,
        };
        await this.bookRepository.save(updatedBook);

        return updatedBook;
    }
}
