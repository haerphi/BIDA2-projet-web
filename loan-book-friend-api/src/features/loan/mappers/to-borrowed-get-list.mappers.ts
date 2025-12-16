import { LoanEntity } from '@loan/models';
import { bookEntityToBookListDto } from '@book/mappers';
import { toUserListDto } from '@user/mappers';
import { BorrowedGetListDto } from '@loan/dtos/borrowed-get-list.dto';

export const loanEntityToBorrowedGetListDto = (
    loan: LoanEntity,
): BorrowedGetListDto => {
    return {
        loanId: loan.loanId,
        book: bookEntityToBookListDto(loan.book),
        owner: toUserListDto(loan.book.owner),
        createdAt: loan.created_at,
        shouldBeReturnedAt: loan.shouldBeReturnedAt,
        returnedAt: loan.returnedAt,
    };
};
