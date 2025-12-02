import { UserEntity } from '@user/models';
import { BookCreateDto, BookUpdateDto } from '@book/dtos';
import { BookEntity } from '@book/models';
import { Builder } from 'builder-pattern';

export const bookCreateDtoToEntity = (
    dto: BookCreateDto,
    user: UserEntity,
): BookEntity => {
    return Builder<BookEntity>()
        .title(dto.title)
        .author(dto.author)
        .owner(user)
        .loanedTo(null)
        .build();
};

export const bookUpdateDtoToEntity = (
    dto: Partial<BookUpdateDto>,
): Partial<BookEntity> => {
    return Builder<Partial<BookEntity>>()
        .title(dto.title)
        .author(dto.author)
        .loanedTo(dto.loanedTo)
        .build();
};
