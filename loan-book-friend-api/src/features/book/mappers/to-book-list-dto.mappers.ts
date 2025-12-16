import { BookListDto } from '@book/dtos';
import { BookEntity } from '@book/models';
import { Builder } from 'builder-pattern';

export const bookEntityToBookListDto = (
    bookEntity: BookEntity,
): BookListDto => {
    return Builder<BookListDto>()
        .title(bookEntity.title)
        .author(bookEntity.author)
        .build();
};
