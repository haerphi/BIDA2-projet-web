import { Component, inject } from '@angular/core';
import { UserService } from '@features/users/services/user.service';

@Component({
    selector: 'app-user-details-page',
    imports: [],
    templateUrl: './user-details-page.html',
    styleUrl: './user-details-page.scss',
})
export class UserDetailsPage {
    private readonly _userService = inject(UserService);

    constructor() {
        this._userService.getConsumers().then(console.log).catch(console.error);
    }
}
