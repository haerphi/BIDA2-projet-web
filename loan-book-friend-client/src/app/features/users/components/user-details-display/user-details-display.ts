import { Component, input } from '@angular/core';
import { UserDetails as UserDetailsType } from '@core/models';

@Component({
    selector: 'app-user-details-display',
    imports: [],
    templateUrl: './user-details-display.html',
    styleUrl: './user-details-display.scss',
})
export class UserDetailsDisplay {
    details = input.required<UserDetailsType>();
    displayAll = input<boolean>(false);
}
