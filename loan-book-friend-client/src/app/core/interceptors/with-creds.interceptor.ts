import { HttpInterceptorFn } from '@angular/common/http';

export const withCredsInterceptor: HttpInterceptorFn = (req, next) => {
    const cloned = req.clone({ withCredentials: true });
    return next(cloned);
};
