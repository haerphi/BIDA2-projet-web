import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserRole } from '@core/constants';
import { AuthService } from '@core/services';

export const roleGuard = (useRoles: UserRole) => {
    const guard: CanActivateFn = (route, state) => {
        const authService = inject(AuthService);

        const role = authService.role();
        if ((!role || role !== useRoles) && useRoles !== UserRole.Admin) {
            console.warn(`Role guard: access denied for role ${role}`);
            return false;
        }

        console.log(`Role guard: access granted for role ${role}`);
        return true;
    };

    return guard;
};
