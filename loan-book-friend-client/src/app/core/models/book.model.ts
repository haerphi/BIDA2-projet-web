import { BookAvailability } from '@core/constants';
import { BookCondition } from '@core/constants/book-condition.enum';
import { ApiPaginationQueryParams } from '@core/models/api.model';

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
    createdAt: Date;
    updatedAt: Date;
    availability: BookAvailability;
}

export interface BookListOwnedQueryParams extends ApiPaginationQueryParams {
    title?: string;
    author?: string;
    condition?: BookCondition;
    availability?: BookAvailability;
}
