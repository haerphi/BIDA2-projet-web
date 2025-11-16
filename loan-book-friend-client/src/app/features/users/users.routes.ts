import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'me',
        loadComponent: () =>
            import(
                '@features/users/pages/user-details-page/user-details-page'
            ).then((c) => c.UserDetailsPage),
    },
];
