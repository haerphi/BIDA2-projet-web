import { UserEntity } from '../../user/models';
import { BookCreateDto } from '../dtos';
import { BookEntity } from '../models';
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
