import { BookListOwnedDto } from '@book/dtos';
import { BookEntityWithAvailability } from '@book/models';
import { Builder } from 'builder-pattern';

export const bookEntityToBookListOwnedDto = (
    bookEntity: BookEntityWithAvailability,
): BookListOwnedDto => {
    return Builder<BookListOwnedDto>()
        .bookId(bookEntity.bookId)
        .title(bookEntity.title)
        .author(bookEntity.author)
        .condition(bookEntity.condition)
        .createdAt(bookEntity.created_at)
        .updatedAt(bookEntity.updated_at)
        .availability(bookEntity.availability)
        .build();
};
