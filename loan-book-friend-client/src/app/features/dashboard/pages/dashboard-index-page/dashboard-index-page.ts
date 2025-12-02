import { Component, inject, OnInit } from '@angular/core';
import { TextBgStyleEnum } from '@core/constants/styles/enums';
import { StatElement } from '@features/dashboard/components/stat-element/stat-element';
import { BookList } from '@features/books/components/book-list/book-list';
import { BookCreate } from '@features/books/components/book-create/book-create';
import { Spoil } from '@components/commons/spoil/spoil';
import { FriendList } from '@features/friends/components/friend-list/friend-list';
import { FriendSendRequest } from '@features/friends/components/friend-send-request/friend-send-request';
import { FriendRequests } from '@features/friends/components/friend-requests/friend-requests';
import { LoanList } from '@features/loans/components/loan-list/loan-list';
import { LoanCreate } from '@features/loans/components/loan-create/loan-create';
import { BookService } from '@core/services';
import { BookUserList } from '@core/models';

@Component({
    selector: 'app-dashboard-index-page',
    imports: [
        StatElement,
        BookList,
        BookCreate,
        Spoil,
        FriendList,
        FriendSendRequest,
        FriendRequests,
        LoanList,
        LoanCreate,
    ],
    templateUrl: './dashboard-index-page.html',
    styleUrl: './dashboard-index-page.scss',
})
export class DashboardIndexPage implements OnInit {
    protected readonly TextBgStyleEnum = TextBgStyleEnum;
    private readonly _bookService = inject(BookService);

    booksLoading = true;
    booksCount: number | null = null;
    books: BookUserList[] = [];
    bookFetchError: string | null = null;

    ngOnInit(): void {
        this.fetchBooks();
    }

    fetchBooks(): void {
        this.booksLoading = true;
        this._bookService
            .getAllOwnedBooks()
            .then((response) => {
                setTimeout(() => {
                    this.booksCount = response.total;
                    this.books = response.data;
                    this.booksLoading = false;
                }, 2000);
            })
            .catch((error) => {
                this.bookFetchError = error.message;
            })
            .finally(() => {});
    }
}
