import { Component, inject, input, OnInit } from '@angular/core';
import { BookUserList, UserDetails } from '@core/models';
import { AuthService, BookService } from '@core/services';
import { UserService } from '@core/services/user.service';
import { UserDetailsDisplay } from '@features/users/components/user-details-display/user-details-display';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationButton } from '@components/commons';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';
import { UserEditForm } from '@features/users/components/user-edit-form/user-edit-form';
import { UserEditPasswordForm } from '@features/users/components/user-edit-password-form/user-edit-password-form';

@Component({
    selector: 'app-user-details-page',
    imports: [
        UserDetailsDisplay,
        RouterLink,
        ConfirmationButton,
        LoadingModal,
        UserEditForm,
        UserEditPasswordForm,
    ],
    templateUrl: './user-details-page.html',
    styleUrl: './user-details-page.scss',
})
export class UserDetailsPage implements OnInit {
    userId = input<string | null>(null); // if null, shows current user else this is used by admin to show other users

    private readonly _userService = inject(UserService);
    private readonly _bookService = inject(BookService);
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    editMode = false;
    changePasswordMode = false;

    userDetails: null | UserDetails = null;
    userDetailsError: null | string = null;

    isBooksLoading = true;
    userBooks: null | BookUserList[] = null;
    userBooksError: null | string = null;

    isPageLoading = false;

    ngOnInit(): void {
        this._refreshUserDetails();
        this._refreshUserBooks();
    }

    async onDeleteBook(bookId: string): Promise<void> {
        this.isBooksLoading = true;
        await this._bookService.deleteBook(bookId);

        // Refresh the book list after deletion
        await this._refreshUserBooks();
    }

    onEditBook(bookId: string): void {
        if (this.userId()) {
            this._router.navigate(['/admin', 'books', bookId, 'edit']);
        } else {
            this._router.navigate(['/books', bookId, 'edit']);
        }
    }

    onDeleteAccount(): void {
        if (!this.userDetails) {
            return;
        }

        this.isPageLoading = true;
        this._userService.deleteUser(this.userId()).then(async () => {
            if (!this.userId()) {
                // If user deleted own account, log out and navigate to home
                await this._authService.logout();
                this._router.navigate(['/']);
            } else {
                // If admin deleted another user's account, navigate back to admin user list
                this._router.navigate(['/admin/users']);
            }
        });
    }

    onEnterEditMode(): void {
        this.editMode = true;
    }

    onExitEditMode(): void {
        this.editMode = false;
    }

    onProfileUpdated(): Promise<void> {
        this.editMode = false;
        return this._refreshUserDetails();
    }

    onEnterChangePasswordMode(): void {
        this.changePasswordMode = true;
    }

    onExitChangePasswordMode(): void {
        this.changePasswordMode = false;
    }

    async onPasswordUpdated(): Promise<void> {
        this.changePasswordMode = false;
        if (!this.userId()) {
            await this._authService.logout();

            this._router.navigate(['/', 'auth', 'login']);
        }
    }

    private async _refreshUserDetails(): Promise<void> {
        this.userDetailsError = null;
        this.userDetails = null;

        let promise = null;
        const userId = this.userId();
        if (userId) {
            promise = this._userService.getUserById(userId);
        } else {
            promise = this._userService.getConsumers();
        }

        promise
            .then((data) => {
                // TODO remove artificial delay
                setTimeout(() => {
                    this.userDetails = data;
                }, 1000);
            })
            .catch(() => {
                this.userDetailsError =
                    'An error occurred while fetching user details.';
            });
    }

    private async _refreshUserBooks(): Promise<void> {
        this.isBooksLoading = true;
        this.userBooksError = null;
        this.userBooks = null;

        let promise = null;
        const userId = this.userId();
        if (userId) {
            promise = this._bookService.getAllBooksByOwner(userId);
        } else {
            promise = this._bookService.getAllOwnedBooks();
        }

        promise
            .then((response) => {
                this.userBooks = response.data;
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
