import { toBookListDto } from '@book/mappers';
import { LoanDetailsDto } from '@loan/dtos';
import { LoanEntity } from '@loan/models';
import { toUserListDto } from '@user/mappers';

export const toLoanDetailsDto = (
    loan: LoanEntity,
    requesterId: string,
): LoanDetailsDto => {
    return {
        loanId: loan.loanId,
        book: toBookListDto(loan.book!),
        lender: toUserListDto(loan.book!.owner),
        borrower: toUserListDto(loan.borrower!),
        createdAt: loan.created_at,
        returnedDate: loan.returnedAt,
        role: loan.book!.owner.user_id === requesterId ? 'LENDER' : 'BORROWER',
    };
};
