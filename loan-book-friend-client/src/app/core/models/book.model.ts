export interface BookList {
    title: string;
    author: string;
}

export interface BookUserList extends BookList {
    book_id: string;
    available: boolean;
}

export interface BookForm {
    title: string;
    author: string;
}

export interface BookDetails {
    book_id: string;
    title: string;
    author: string;
    available: boolean;
}
