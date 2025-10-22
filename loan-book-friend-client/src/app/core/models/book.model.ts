import { UserList } from './user.model';

export interface BookList {
    title: string;
    author: string;
}

export interface BookUserList extends BookList {
    book_id: string;
    available: boolean;
}

export interface BookCreate {
    title: string;
    author: string;
}
