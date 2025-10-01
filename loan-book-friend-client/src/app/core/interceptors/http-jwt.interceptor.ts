import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services';

export const httpJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.token();

    if (token) {
        const requestClone = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + token),
        });

        return next(requestClone);
    }

    return next(req);
};
