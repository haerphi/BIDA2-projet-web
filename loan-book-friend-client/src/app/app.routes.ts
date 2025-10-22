import { Routes } from '@angular/router';
import { UserRole } from '@core/constants';
import { connectedGuard, notConnectedGuard, roleGuard } from '@core/guards';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('@features/home/home.routes').then((m) => m.routes),
    },
    {
        path: 'auth',
        canActivateChild: [notConnectedGuard],
        loadChildren: () =>
            import('@features/auth/auth.routes').then((m) => m.routes),
    },
    {
        path: 'users',
        canActivateChild: [connectedGuard],
        loadChildren: () =>
            import('@features/users/users.routes').then((m) => m.routes),
    },
    {
        path: 'books',
        canActivateChild: [connectedGuard],
        loadChildren: () =>
            import('@features/books/books.routes').then((m) => m.routes),
    },
    {
        path: 'admin',
        canActivateChild: [roleGuard(UserRole.Admin)],
        loadChildren: () =>
            import('@features/admin/admin.routes').then((m) => m.routes),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
