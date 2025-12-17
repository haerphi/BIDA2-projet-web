import { LoanEntity } from '@loan/models';
import { LoanGetListDto, LoanGetListWithBookDto } from '@loan/dtos';
import { bookEntityToBookListDto } from '@book/mappers';
import { toUserListDto } from '@user/mappers';

export const loanEntityToLoanGetListWithBookDto = (
    loan: LoanEntity,
): LoanGetListWithBookDto => {
    return {
        loanId: loan.loanId,
        bookId: loan.book.bookId,
        book: bookEntityToBookListDto(loan.book),
        borrower: toUserListDto(loan.borrower),
        createdAt: loan.created_at,
        shouldBeReturnedAt: loan.shouldBeReturnedAt,
        returnedAt: loan.returnedAt,
    };
};

export const loanEntityToLoanGetListDto = (
    loan: LoanEntity,
): LoanGetListDto => {
    return {
        loanId: loan.loanId,
        bookId: loan.book.bookId,
        borrower: toUserListDto(loan.borrower),
        createdAt: loan.created_at,
        shouldBeReturnedAt: loan.shouldBeReturnedAt,
        returnedAt: loan.returnedAt,
    };
};
