import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error) => {
            console.log(error);
            // TODO manage refresh token

            if (error.status === 403) {
                // redirection vers auth
                authService.logout();
                router.navigate(['/', 'auth']);
                return throwError(() => null);
            } else {
            }

            return throwError(() => error.error);
        }),
    );
};
