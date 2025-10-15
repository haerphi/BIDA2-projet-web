import { Routes } from '@angular/router';
import { AdminHomePage } from './pages/admin-home-page/admin-home-page';
import { roleGuard } from '@core/guards';
import { UserRole } from '@core/constants';

export const routes: Routes = [
    {
        path: '',
        canActivate: [roleGuard(UserRole.Admin)],
        component: AdminHomePage,
        children: [
            {
                path: 'users',
                loadComponent: () =>
                    import(
                        './pages/users/admin-user-listing/admin-user-listing'
                    ).then((m) => m.AdminUserListing),
            },
            {
                path: 'users/:id',
                loadComponent: () =>
                    import(
                        './pages/users/admin-user-details/admin-user-details'
                    ).then((m) => m.AdminUserDetails),
            },
            {
                path: 'loans',
                loadComponent: () =>
                    import(
                        './pages/loans/admin-loan-listing/admin-loan-listing'
                    ).then((m) => m.AdminLoanListing),
            },
            {
                path: 'loans/:id',
                loadComponent: () =>
                    import(
                        './pages/loans/admin-loan-details/admin-loan-details'
                    ).then((m) => m.AdminLoanDetails),
            },
        ],
    },
];
