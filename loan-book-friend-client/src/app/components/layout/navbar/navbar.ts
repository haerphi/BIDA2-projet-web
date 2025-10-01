import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    private readonly _authService = inject(AuthService);

    connected = computed(() => !!this._authService.token());

    onLogoutClick() {
        this._authService.logout();
    }
}
