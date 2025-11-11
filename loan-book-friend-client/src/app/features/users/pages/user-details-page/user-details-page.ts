import { Component, inject } from '@angular/core';
import { BookUserList, UserDetails } from '@core/models';
import { AuthService, BookService } from '@core/services';
import { UserService } from '@core/services/user.service';
import { UserDetailsDisplay } from '@features/users/components/user-details-display/user-details-display';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationButton } from '@components/commons';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';

@Component({
    selector: 'app-user-details-page',
    imports: [UserDetailsDisplay, RouterLink, ConfirmationButton, LoadingModal],
    templateUrl: './user-details-page.html',
    styleUrl: './user-details-page.scss',
})
export class UserDetailsPage {
    private readonly _userService = inject(UserService);
    private readonly _bookService = inject(BookService);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    isDetailsLoading = true;
    userDetails: null | UserDetails = null;
    userDetailsError: null | string = null;

    isBooksLoading = true;
    userBooks: null | BookUserList[] = null;
    userBooksError: null | string = null;

    isPageLoading = false;

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
            .getAllOwnedBooks()
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
        await this._bookService.deleteBook(bookId);

        // Refresh the book list after deletion
        this.userBooks = await this._bookService.getAllOwnedBooks();
        this.isBooksLoading = false;
    }

    onDeleteAccount(): void {
        if (!this.userDetails) {
            return;
        }

        this.isPageLoading = true;
        this._userService.deleteUser().then(async () => {
            await this._authService.logout();
            this._router.navigate(['/']);
        });
    }
}
