import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationButton } from '@components/commons';
import { BookUserList, UserDetails } from '@core/models';
import { BookService, UserService } from '@core/services';
import { UserDetailsDisplay } from '@features/users/components/user-details-display/user-details-display';

@Component({
    selector: 'app-admin-user-details',
    imports: [UserDetailsDisplay, RouterLink, ConfirmationButton],
    templateUrl: './admin-user-details.html',
    styleUrl: './admin-user-details.scss',
})
export class AdminUserDetails {
    private readonly _userService = inject(UserService);
    private readonly _bookService = inject(BookService);
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _router = inject(Router);

    userId = this._activatedRoute.snapshot.paramMap.get('id');

    isDetailsLoading = true;
    userDetails: null | UserDetails = null;
    userDetailsError: null | string = null;

    isBooksLoading = true;
    userBooks: null | BookUserList[] = null;
    userBooksError: null | string = null;

    constructor() {
        if (!this.userId) {
            this.userDetailsError = 'No user ID provided in the route.';
            this.isDetailsLoading = false;
            this.isBooksLoading = false;
            return;
        }

        this._userService
            .getUserById(this.userId)
            .then((data) => {
                this.userDetails = data;
            })
            .catch(() => {
                this.userDetailsError =
                    'An error occurred while fetching user details.';
            })
            .finally(() => {
                this.isDetailsLoading = false;
            });

        this._bookService
            .getAllBooksByOwner(this.userId)
            .then((data) => {
                this.userBooks = data;
            })
            .catch(() => {
                this.userBooksError =
                    'An error occurred while fetching user books.';
            })
            .finally(() => {
                this.isBooksLoading = false;
            });
    }

    onDeleteBook(bookId: string) {
        this._bookService.deleteBook(bookId).then(() => {
            // Refresh the book list after deletion
            if (this.userId) {
                this.isBooksLoading = true;
                this._bookService
                    .getAllBooksByOwner(this.userId)
                    .then((data) => {
                        this.userBooks = data;
                    })
                    .catch(() => {
                        this.userBooksError =
                            'An error occurred while fetching user books.';
                    })
                    .finally(() => {
                        this.isBooksLoading = false;
                    });
            }
        });
    }

    onDeleteUser() {
        if (!this.userId) {
            return;
        }

        this._userService
            .deleteUser(this.userId)
            .then(() => {
                this._router.navigate(['/admin', 'users']);
            })
            .catch(() => {
                this.userDetailsError =
                    'An error occurred while deleting the user.';
            });
    }
}
