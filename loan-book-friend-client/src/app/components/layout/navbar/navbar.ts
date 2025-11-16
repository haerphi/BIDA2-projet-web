import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    private readonly _router = inject(Router);

    connected = computed(() => !!this._authService.tokenIat());
    role = this._authService.role;

    async onLogoutClick() {
        await this._authService.logout();

        this._router.navigate(['/']);
    }
}
