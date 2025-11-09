import { BookListDto, BookUserListDto } from '../dtos';
import { BookEntity } from '../models';

export const toBookListDto = (book: BookEntity): BookListDto => {
    return {
        title: book.title,
        author: book.author,
    };
};

export const toBookUserListDto = (book: BookEntity): BookUserListDto => {
    return {
        title: book.title,
        author: book.author,
        book_id: book.book_id,
        available: book.available,
    };
};
