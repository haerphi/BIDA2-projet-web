import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/constants';
import { AuthService } from '@core/services';

export const roleGuard = (useRoles: UserRole) => {
    const guard: CanActivateFn = (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const role = authService.role();
        console.log(!role || role !== useRoles, useRoles !== UserRole.Admin);

        if ((!role || role !== useRoles) && role !== UserRole.Admin) {
            router.navigate(['/', 'error', 'not-found']);
            return false;
        }

        return true;
    };

    return guard;
};
