import { BookList } from '@core/models/book.model';
import { UserList } from '@core/models/user.model';
import { ApiPaginationQueryParams } from '@core/models/api.model';
import { LoanStatusEnum } from '@core/constants';

export interface LoanGetListDto {
    loanId: string;
    bookId: string;
    borrower: UserList;
    createdAt: Date;
    shouldBeReturnedAt: Date | null;
    returnedAt: Date | null;
}

export interface LoanGetListWithBookDto extends LoanGetListDto {
    book: BookList;
}

export interface BorrowedGetListDto {
    loanId: string;
    book: BookList;
    owner: UserList;
    createdAt: Date;
    shouldBeReturnedAt: Date | null;
    returnedAt: Date | null;
}

export interface LoanGetListQueryDto extends ApiPaginationQueryParams {
    bookId?: string;
    borrowerId?: string;
    status?: LoanStatusEnum;
}

export interface BorrowGetListQueryDto extends ApiPaginationQueryParams {
    bookId?: string;
    loanerId?: string;
    status?: LoanStatusEnum;
}

export interface CreateLoanForm {
    borrowerId: string;
    bookId: string;
    returnDate: Date | null;
}
