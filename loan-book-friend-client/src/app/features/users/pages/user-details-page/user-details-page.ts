import { Component, inject } from '@angular/core';
import { BookUserList, UserDetails } from '@core/models';
import { BookService } from '@core/services';
import { UserService } from '@core/services/user.service';
import { UserDetailsDisplay } from '@features/users/components/user-details-display/user-details-display';
import { RouterLink } from '@angular/router';
import { ConfirmationButton } from '@components/commons';

@Component({
    selector: 'app-user-details-page',
    imports: [UserDetailsDisplay, RouterLink, ConfirmationButton],
    templateUrl: './user-details-page.html',
    styleUrl: './user-details-page.scss',
})
export class UserDetailsPage {
    private readonly _userService = inject(UserService);
    private readonly _bookService = inject(BookService);

    isDetailsLoading = true;
    userDetails: null | UserDetails = null;
    userDetailsError: null | string = null;

    isBooksLoading = true;
    userBooks: null | BookUserList[] = null;
    userBooksError: null | string = null;

    constructor() {
        this._userService
            .getConsumers()
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
            .getAllBooksByOwner()
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

    async onDeleteBook(bookId: string): Promise<void> {
        this.isBooksLoading = true;
        await this._bookService.deleteOwnedBook(bookId);

        // Refresh the book list after deletion
        this.userBooks = await this._bookService.getAllBooksByOwner();
        this.isBooksLoading = false;
    }
}
