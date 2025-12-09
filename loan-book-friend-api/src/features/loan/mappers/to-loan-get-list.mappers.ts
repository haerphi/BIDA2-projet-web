import { LoanEntity } from '@loan/models';
import { LoanGetListDto } from '@loan/dtos';
import { bookEntityToBookListDto } from '@book/mappers';
import { toUserListDto } from '@user/mappers';

export const loanEntityToLoanGetListDto = (
    loan: LoanEntity,
): LoanGetListDto => {
    return {
        loanId: loan.loanId,
        book: bookEntityToBookListDto(loan.book),
        borrower: toUserListDto(loan.borrower),
        createdAt: loan.created_at,
        shouldBeReturnedAt: loan.shouldBeReturnedAt,
        returnedAt: loan.returnedAt,
    };
};
