import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserRole } from '@core/constants';
import { AuthService } from '@core/services';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    protected readonly UserRole = UserRole;
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    connected = computed(() => !!this._authService.tokenIat());
    role = this._authService.role;

    async onLogoutClick() {
        await this._authService.logout();

        await this._router.navigate(['/auth']);
    }
}
