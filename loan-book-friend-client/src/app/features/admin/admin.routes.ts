import { Routes } from '@angular/router';
import { AdminHomePage } from './pages/admin-home-page/admin-home-page';

export const routes: Routes = [
    {
        path: '',
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
            {
                path: 'books/:id/edit',
                loadComponent: () =>
                    import(
                        './pages/books/admin-book-edit/admin-book-edit'
                    ).then((m) => m.AdminBookEdit),
            },
        ],
    },
];
