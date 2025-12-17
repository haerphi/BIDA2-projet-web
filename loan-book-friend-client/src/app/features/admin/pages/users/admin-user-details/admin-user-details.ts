import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '@core/services';
import {UserDetails} from '@features/users/componennts/user-details/user-details';
import {ConfirmationButton} from '@components/commons';
import {UserDetailsDto} from '@core/models';

@Component({
  selector: 'app-admin-user-details',
  imports: [RouterLink, UserDetails, ConfirmationButton],
  templateUrl: './admin-user-details.html',
  styleUrl: './admin-user-details.scss',
})
export class AdminUserDetails implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _userService = inject(UserService);

  userDetails: UserDetailsDto | null = null;
  userError: string | null = null;

  async ngOnInit(): Promise<void> {
    this._activatedRoute.params.subscribe(async (params) => {
      const userId = params['id'];
      this.getUserDetails(userId);
    });
  }

  private getUserDetails(userId: string): void {
    this._userService
      .getUserById(userId)
      .then((user) => {
          this.userDetails = user;
      })
      .catch((error) => {
        this.userError =
          error.message ||
          'An error occurred while fetching user details.';
      });
  }

  onDeleteUser(): void {
    console.log('Delete user action triggered', this.userDetails!.userId);
  }
}
