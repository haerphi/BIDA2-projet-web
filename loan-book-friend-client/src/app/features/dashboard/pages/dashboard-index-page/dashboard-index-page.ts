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
import {
    BookListOwned,
    BookListOwnedQueryParams,
    BorrowedGetListDto,
    CreateLoanForm,
    FriendGetListDto,
    FriendGetListQueryDto,
    LoanGetListDto,
    LoanGetListQueryDto,
    ReceivedFriendRequestDto,
    SendFriendRequestFormDto,
    SentFriendRequestDto,
} from '@core/models';
import { FriendService } from '@core/services/friend.service';
import { Spinner } from '@components/commons/loadings/spinner/spinner';
import { LoanService } from '@core/services/loan.service';
import { LoanStatusEnum } from '@core/constants';

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
        Spinner,
    ],
    templateUrl: './dashboard-index-page.html',
    styleUrl: './dashboard-index-page.scss',
})
export class DashboardIndexPage implements OnInit {
    protected readonly TextBgStyleEnum = TextBgStyleEnum;
    private readonly _bookService = inject(BookService);
    private readonly _friendService = inject(FriendService);
    private readonly _loanService = inject(LoanService);

    // BOOKS
    booksLoading = true;
    booksCount: number | null = null;
    books: BookListOwned[] = [];
    bookFetchError: string | null = null;

    // FRIENDS
    friendsLoading = true;
    friendsCount: number | null = null;
    friends: FriendGetListDto[] = [];
    friendsFetchError: string | null = null;

    friendRequestsLoading = true;
    sentFriendRequestsCount: number | null = null;
    receivedFriendRequestsCount: number | null = null;
    sentFriendRequests: SentFriendRequestDto[] = [];
    receivedFriendRequests: ReceivedFriendRequestDto[] = [];
    friendRequestsFetchError: string | null = null;

    // LOANS
    loansLoading = true;
    loansCount: number | null = null;
    boorrowedCount: number | null = null;
    loanedBooks: LoanGetListDto[] = [];
    borrowedBooks: BorrowedGetListDto[] = [];
    loansFetchError: string | null = null;

    ngOnInit(): void {
        this.fetchBooks();
        this.fetchFriends();
        this.fetchFriendRequests();
        this.fetchLoans();
    }

    // BOOKS
    fetchBooks(): void {
        this.booksLoading = true;
        this._bookService
            .getAllOwnedBooks()
            .then((response) => {
                this.booksCount = response.total;
                this.books = response.data;
            })
            .catch((error) => {
                this.bookFetchError = error.message;
            })
            .finally(() => {
                this.booksLoading = false;
            });
    }

    onBookCreated(): void {
        this.fetchBooks();
    }

    onFilterBooks(filters: BookListOwnedQueryParams): void {
        this._bookService
            .getAllOwnedBooks(filters)
            .then((response) => {
                this.books = response.data;
            })
            .catch((error) => {
                this.bookFetchError = error.message;
            })
            .finally(() => {
                this.booksLoading = false;
            });
    }

    // FRIENDS
    fetchFriends(): void {
        this.friendsLoading = true;
        this._friendService
            .getFriends()
            .then((response) => {
                this.friendsCount = response.total;
                this.friends = response.data;
            })
            .catch((error) => {
                this.friendsFetchError = error.message;
            })
            .finally(() => {
                this.friendsLoading = false;
            });
    }

    fetchFriendRequests(): void {
        this.friendRequestsLoading = true;
        Promise.all([
            this._friendService.getSentFriendRequests(),
            this._friendService.getReceivedFriendRequests(),
        ])
            .then(([sentResponse, receivedResponse]) => {
                this.sentFriendRequestsCount = sentResponse.total;
                this.receivedFriendRequestsCount = receivedResponse.total;
                this.sentFriendRequests = sentResponse.data;
                this.receivedFriendRequests = receivedResponse.data;
            })
            .catch((error) => {
                this.friendRequestsFetchError = error.message;
            })
            .finally(() => {
                this.friendRequestsLoading = false;
            });
    }

    onAcceptFriendRequest(requestId: string): void {
        this._friendService
            .acceptFriendRequest(requestId)
            .then(() => {
                this.fetchFriends();
                this.fetchFriendRequests();
            })
            .catch((error) => {
                this.friendRequestsFetchError = error.message;
            });
    }

    onDeclineFriendRequest(requestId: string): void {
        this._friendService
            .denyFriendRequest(requestId)
            .then(() => {
                this.fetchFriendRequests();
            })
            .catch((error) => {
                this.friendRequestsFetchError = error.message;
            });
    }

    onSendFriendRequest(form: SendFriendRequestFormDto): void {
        this._friendService
            .sendFriendRequest(form)
            .then(() => {
                this.fetchFriendRequests();
            })
            .catch((error) => {
                this.friendRequestsFetchError = error.message;
            });
    }

    onFilterFriends(filters: FriendGetListQueryDto): void {
        this._friendService
            .getFriends(filters)
            .then((response) => {
                this.friends = response.data;
            })
            .catch((error) => {
                this.friendsFetchError = error.message;
            })
            .finally(() => {
                this.friendsLoading = false;
            });
    }

    // LOANS
    fetchLoans(): void {
        this.loansLoading = true;
        Promise.all([
            this._loanService.getLoans(),
            this._loanService.getBorrowedBooks(),
        ])
            .then(([loanedResponse, borrowedResponse]) => {
                // update the total counts only if no filter is applied
                this.loansCount = loanedResponse.total;
                this.boorrowedCount = borrowedResponse.total;

                this.loanedBooks = loanedResponse.data;
                this.borrowedBooks = borrowedResponse.data;
            })
            .catch((error) => {
                this.loansFetchError = error.message;
            })
            .finally(() => {
                this.loansLoading = false;
            });
    }

    onCreateLoan(data: CreateLoanForm) {
        this._loanService.createLoan(data).then(() => {
            this.fetchLoans();
            this.fetchBooks();
            this.fetchFriends();
        });
    }

    onFilterLoans(status: LoanStatusEnum | null) {
        const loanFilters: LoanGetListQueryDto = {};
        const borrowedFilters: LoanGetListQueryDto = {};

        if (status) {
            loanFilters.status = status;
            borrowedFilters.status = status;
        }

        Promise.all([
            this._loanService.getLoans(loanFilters),
            this._loanService.getBorrowedBooks(borrowedFilters),
        ])
            .then(([loanedResponse, borrowedResponse]) => {
                this.loanedBooks = loanedResponse.data;
                this.borrowedBooks = borrowedResponse.data;
            })
            .catch((error) => {
                this.loansFetchError = error.message;
            })
            .finally(() => {
                this.loansLoading = false;
            });
    }
}
