import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../models';
import { Repository } from 'typeorm';

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

    async deleteByIdAndOwnerId(
        id: string,
        ownerId: string | null,
    ): Promise<void> {
        // find the book by id and owner id
        const book = await this.bookRepository.findOne({
            relations: { owner: true },
            where: { book_id: id },
        });

        // if ownerId is provided, check if it matches the book's owner
        if (ownerId) {
            if (!book || book.owner.user_id !== ownerId) {
                throw new Error('Book not found or unauthorized');
            }
        }

        // delete the book
        await this.bookRepository.delete({ book_id: id });
    }
}
