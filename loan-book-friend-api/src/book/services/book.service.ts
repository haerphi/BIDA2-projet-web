import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'book/models';
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
}
