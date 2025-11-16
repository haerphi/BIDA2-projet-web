import { toBookListDto } from '@book/mappers';
import { LoanDetailsDto } from '@loan/dtos';
import { LoanEntity } from '@loan/models';
import { toUserListDto } from '@user/mappers';

export const toLoanDetailsDto = (loan: LoanEntity): LoanDetailsDto => {
    return {
        loanId: loan.loanId,
        book: toBookListDto(loan.book!),
        borrower: toUserListDto(loan.borrower!),
    };
};
