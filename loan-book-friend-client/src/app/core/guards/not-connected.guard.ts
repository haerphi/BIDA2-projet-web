import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';

export const notConnectedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.tokenIat()) {
        return true;
    }

    router.navigate(['/', 'users', 'me']);

    return false;
};
