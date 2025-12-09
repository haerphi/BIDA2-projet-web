import { BookList } from '@core/models/book.model';
import { UserList } from '@core/models/user.model';

export interface LoanGetListDto {
    loanId: string;
    book: BookList;
    borrower: UserList;
    createdAt: Date;
    shouldBeReturnedAt: Date | null;
    returnedAt: Date | null;
}

export interface BorrowedGetListDto {
    loanId: string;
    book: BookList;
    owner: UserList;
    createdAt: Date;
    shouldBeReturnedAt: Date | null;
    returnedAt: Date | null;
}

export interface CreateLoanForm {
    borrowerId: string;
    bookId: string;
    returnDate: Date | null;
}
