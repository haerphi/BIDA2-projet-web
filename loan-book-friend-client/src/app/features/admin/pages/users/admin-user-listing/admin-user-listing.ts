import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationButton } from '@components/commons';
import { UserList } from '@core/models';
import { UserService } from '@core/services';

@Component({
    selector: 'app-admin-user-listing',
    imports: [RouterLink, ConfirmationButton],
    templateUrl: './admin-user-listing.html',
    styleUrl: './admin-user-listing.scss',
})
export class AdminUserListing implements OnInit {
    private readonly _userService = inject(UserService);

    users: UserList[] | null = null;
    errorLoadingUsers = '';

    async ngOnInit(): Promise<void> {
        try {
            this.users = await this._userService.getAllUsers();
        } catch (err) {
            console.log(err);

            this.errorLoadingUsers = 'Failed to load users.';
        }
    }

    async deleteUser(userId: string): Promise<void> {
        console.log('Deleting user:', userId);

        // await this._userService.deleteUser(userId);
    }
}
