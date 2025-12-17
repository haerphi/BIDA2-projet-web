import {Component, input} from '@angular/core';
import {UserDetailsDto} from '@core/models';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-user-details',
  imports: [
    DatePipe,
  ],
    templateUrl: './user-details.html',
    styleUrl: './user-details.scss',
})
export class UserDetails {
  user = input.required<UserDetailsDto>();
}
