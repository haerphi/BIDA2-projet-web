import { BookDetailsDto } from '@book/dtos/book-details.dto';
import { BookEntityWithAvailability } from '@book/models';
import { Builder } from 'builder-pattern';
import { toUserListDto } from '@user/mappers';
import { loanEntityToLoanGetListDto } from '@loan/mappers';

export const bookEntityToBookDetailsDto = (
    bookEntity: BookEntityWithAvailability,
): BookDetailsDto => {
    return Builder<BookDetailsDto>()
        .bookId(bookEntity.bookId)
        .title(bookEntity.title)
        .author(bookEntity.author)
        .condition(bookEntity.condition)
        .availability(bookEntity.availability)
        .owner(toUserListDto(bookEntity.owner))
        .loans(bookEntity.loans.map((loan) => loanEntityToLoanGetListDto(loan)))
        .build();
};
