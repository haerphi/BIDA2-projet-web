import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCode } from '@core/constants/api-code.enum';
import { ApiErrorResponse } from '@core/models';
import { AuthService } from '@core/services';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (
                error.status === 401 &&
                error?.error?.code === ApiCode.ExceptionInValidExpiredToken
            ) {
                return from(authService.refreshToken()).pipe(
                    switchMap(() => {
                        return next(req);
                    }),
                    catchError((newError) => {
                        authService.logout();
                        router.navigate(['/', 'auth']);
                        return throwError(() => newError);
                    }),
                );
            }

            if (error.status === 403) {
                return from(authService.refreshToken()).pipe(
                    switchMap(() => {
                        return next(req);
                    }),
                    catchError((newError) => {
                        authService.logout();
                        router.navigate(['/', 'auth']);
                        return throwError(() => newError);
                    }),
                );
            }

            return throwError(
                () =>
                    new ApiErrorResponse(
                        error?.error?.code,
                        error?.error?.form,
                    ),
            );
        }),
    );
};
