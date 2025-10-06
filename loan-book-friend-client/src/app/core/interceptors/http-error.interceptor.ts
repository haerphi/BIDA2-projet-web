import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCode } from '@core/constants/api-code.enum';
import { AuthService } from '@core/services';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (
                error.status === 401 &&
                error?.error?.code === ApiCode.EXCEPTION_INVALID_EXPIRED_TOKEN
            ) {
                return from(authService.refreshToken()).pipe(
                    switchMap(() => {
                        return next(req);
                    }),
                    catchError(() => {
                        console.log('Refresh token error');

                        authService.logout();
                        router.navigate(['/', 'auth']);
                        return throwError(() => error);
                    }),
                );
            }

            if (error.status === 403) {
                authService.logout();
                router.navigate(['/', 'auth']);
                return EMPTY;
            }

            return throwError(() => error);
        }),
    );
};
