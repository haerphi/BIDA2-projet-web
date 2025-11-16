import { BookListDto } from '@book/dtos';
import { UserListDto } from '@user/dtos';

export class LoanDetailsDto {
    loanId: string;

    book: BookListDto;
    borrower: UserListDto;
}
