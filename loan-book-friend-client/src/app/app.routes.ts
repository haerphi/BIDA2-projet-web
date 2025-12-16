import { Routes } from '@angular/router';
import { UserRole } from '@core/constants';
import { connectedGuard, notConnectedGuard, roleGuard } from '@core/guards';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        canActivateChild: [notConnectedGuard],
        loadChildren: () =>
            import('@features/auth/auth.routes').then((m) => m.routes),
    },
    {
        path: 'book',
        canActivateChild: [connectedGuard],
        loadChildren: () =>
            import('@features/books/books.routes').then((m) => m.routes),
    },
    {
        path: 'dashboard',
        canActivateChild: [connectedGuard],
        loadChildren: () =>
            import('@features/dashboard/dashboard.routes').then(
                (m) => m.routes,
            ),
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
