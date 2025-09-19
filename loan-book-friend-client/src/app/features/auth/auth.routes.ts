import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('@features/auth/pages/login-page/login-page').then(
                (m) => m.LoginPage,
            ),
    },
];
