import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserRole } from '@core/constants';
import { AuthService } from '@core/services';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    protected readonly UserRole = UserRole;
    private readonly _authService = inject(AuthService);

    connected = computed(() => !!this._authService.tokenIat());
    role = this._authService.role;

    onLogoutClick() {
        this._authService.logout();
    }
}
