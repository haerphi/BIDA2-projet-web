import { BookAvailability } from '@core/constants';
import { BookCondition } from '@core/constants/book-condition.enum';
import { ApiPaginationQueryParams } from '@core/models/api.model';
import { UserList } from '@core/models/user.model';
import { LoanGetListDto } from '@core/models/loan.model';

export interface BookList {
    title: string;
    author: string;
}

export interface BookListOwned {
    bookId: string;
    title: string;
    author: string;
    condition: BookCondition;
    createdAt: Date;
    updatedAt: Date;
    availability: BookAvailability;
}

export interface BookForm {
    title: string;
    author: string;
    condition: BookCondition;
}

export interface BookDetails {
    bookId: string;
    title: string;
    author: string;
    condition: BookCondition;
    availability: BookAvailability;
    owner: UserList;
    loans: LoanGetListDto[];
}

export interface BookListOwnedQueryParams extends ApiPaginationQueryParams {
    title?: string;
    author?: string;
    condition?: BookCondition;
    availability?: BookAvailability;
}
