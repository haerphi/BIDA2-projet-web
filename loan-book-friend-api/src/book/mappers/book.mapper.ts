import { UserEntity } from '@user/models';
import { BookCreateDto } from 'book/dtos';
import { BookEntity } from 'book/models';
import { Builder } from 'builder-pattern';

export const bookCreateDtoToEntity = (
    dto: BookCreateDto,
    user: UserEntity,
): BookEntity => {
    return Builder<BookEntity>()
        .title(dto.title)
        .author(dto.author)
        .owner(user)
        .available(true)
        .build();
};
