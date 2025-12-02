import { NotFoundException } from '@common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '@book/models';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/models';
import { UserRole } from '@security/enums';
import { UserService } from '@user/services';
import { BookListQueryDto, BookOwnedListQueryDto } from '@book/dtos';
import { executePagination } from '@common/utils/repository.utils';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        private readonly userService: UserService,
    ) {}

    async create(book: BookEntity): Promise<BookEntity> {
        return this.bookRepository.save(book);
    }

    async delete(id: string): Promise<void> {
        await this.bookRepository.delete({ book_id: id });
    }

    async findAll(
        filters: BookListQueryDto,
    ): Promise<{ books: BookEntity[]; total: number }> {
        // distinc book title and author filter
        let query = this.bookRepository.createQueryBuilder('book');

        if (filters.title) {
            query = query.where('book.title ILIKE :title', {
                title: `%${filters.title}%`,
            });
        }

        if (filters.author) {
            query = query.andWhere('book.author ILIKE :author', {
                author: `%${filters.author}%`,
            });
        }

        const [total, books] = await Promise.all(
            executePagination<BookEntity>(query, filters),
        );

        return { total, books };
    }

    async findAllByOwnerId(
        ownerId: string,
        filters: BookOwnedListQueryDto,
    ): Promise<{ books: BookEntity[]; total: number }> {
        let query = this.bookRepository
            .createQueryBuilder('book')
            .where('book.owner_id = :ownerId', { ownerId });

        if (filters.title) {
            query = query.andWhere('book.title ILIKE :title', {
                title: `%${filters.title}%`,
            });
        }

        if (filters.author) {
            query = query.andWhere('book.author ILIKE :author', {
                author: `%${filters.author}%`,
            });
        }

        if (filters.currentlyLoaned !== undefined) {
            if (filters.currentlyLoaned) {
                query = query.andWhere('book.available = false');
            } else {
                query = query.andWhere('book.available = true');
            }
        }

        const [total, books] = await Promise.all(
            executePagination<BookEntity>(query, filters),
        );

        return { total, books };
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

    async findById(id: string, requester_id: string) {
        const book = await this.bookRepository.findOne({
            where: { book_id: id },
            relations: { owner: true },
        });

        if (!book) {
            throw new NotFoundException('book_not_found');
        }

        const requester = await this.userService.findById(requester_id);

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
        };

        if (bookData.loanedTo !== undefined) {
            updatedBook.loanedTo = bookData.loanedTo;
        }

        await this.bookRepository.save(updatedBook);

        return updatedBook;
    }
}
