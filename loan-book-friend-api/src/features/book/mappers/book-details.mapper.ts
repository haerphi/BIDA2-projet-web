import { GetBookAvailability } from '@book/book-availability.utils';
import { BookDetailsDto } from '@book/dtos';
import { BookEntity } from '@book/models';

export const toBookDetailsDto = (book: BookEntity): BookDetailsDto => {
    return {
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        loanedTo: book.loanedTo,
        available: GetBookAvailability(book.loanedTo),
    };
};
