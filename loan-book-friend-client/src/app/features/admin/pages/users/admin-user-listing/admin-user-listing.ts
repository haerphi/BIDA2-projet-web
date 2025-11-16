import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';
import { UserList } from '@core/models';
import { UserService } from '@core/services';

@Component({
    selector: 'app-admin-user-listing',
    imports: [RouterLink, LoadingModal],
    templateUrl: './admin-user-listing.html',
    styleUrl: './admin-user-listing.scss',
})
export class AdminUserListing implements OnInit {
    private readonly _userService = inject(UserService);

    users: UserList[] | null = null;
    errorLoadingUsers = '';

    loading = true;
    laodingText = 'Loading users...';

    async ngOnInit(): Promise<void> {
        try {
            this.users = await this._userService.getAllUsers();
        } catch (err) {
            console.log(err);

            this.errorLoadingUsers = 'Failed to load users.';
        } finally {
            this.loading = false;
        }
    }
}
