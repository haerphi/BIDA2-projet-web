import { BookCreateFormDto } from '@book/dtos';
import { BookEntity } from '@book/models';
import { Builder } from 'builder-pattern';

export const bookCreateFormDtoToBookEntity = (
    dto: BookCreateFormDto,
): BookEntity => {
    return Builder<BookEntity>()
        .title(dto.title)
        .author(dto.author)
        .condition(dto.condition)
        .build();
};
