import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookUserList, UserDetails } from '@core/models';
import { BookService, UserService } from '@core/services';
import { UserDetailsDisplay } from '@features/users/components/user-details/user-details-display';

@Component({
    selector: 'app-admin-user-details',
    imports: [UserDetailsDisplay],
    templateUrl: './admin-user-details.html',
    styleUrl: './admin-user-details.scss',
})
export class AdminUserDetails {
    private readonly _userService = inject(UserService);
    private readonly _bookService = inject(BookService);
    private readonly _activatedRoute = inject(ActivatedRoute);

    isDetailsLoading = true;
    userDetails: null | UserDetails = null;
    userDetailsError: null | string = null;

    isBooksLoading = true;
    userBooks: null | BookUserList[] = null;
    userBooksError: null | string = null;

    constructor() {
        const userId = this._activatedRoute.snapshot.paramMap.get('id');

        if (!userId) {
            this.userDetailsError = 'No user ID provided in the route.';
            this.isDetailsLoading = false;
            this.isBooksLoading = false;
            return;
        }

        this._userService
            .getUserById(userId)
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
            .getAllBooksByOwner(userId)
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
}
