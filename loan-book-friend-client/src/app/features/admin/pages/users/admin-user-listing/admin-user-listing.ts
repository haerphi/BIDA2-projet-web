import { Component, inject } from '@angular/core';
import { UserService } from '@core/services';
import { UserListWithRole } from '@core/models';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserRole } from '@core/constants';

@Component({
    selector: 'app-admin-user-listing',
    imports: [RouterLink, NgClass],
    templateUrl: './admin-user-listing.html',
    styleUrl: './admin-user-listing.scss',
})
export class AdminUserListing {
    protected readonly UserRole = UserRole;

    private readonly _userService = inject(UserService);

    loading = true;
    numberOfUsers = 0;
    users: UserListWithRole[] = [];
    usersError: string | null = null;

    constructor() {
        this.loading = true;
        this._userService
            .getAllUsers()
            .then((response) => {
                this.users = response.data;
                this.numberOfUsers = response.total;
            })
            .catch((error) => {
                this.usersError =
                    error.message ||
                    'An error occurred while fetching user list.';
            });
    }
}
