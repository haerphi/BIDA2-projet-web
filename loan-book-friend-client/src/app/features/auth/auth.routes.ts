import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('@features/auth/pages/login-page/login-page').then(
                (m) => m.LoginPage,
            ),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('@features/auth/pages/register-page/register-page').then(
                (m) => m.RegisterPage,
            ),
    },
];
