import { Routes } from '@angular/router';
import { connectedGuard } from '@core/guards';

export const routes: Routes = [
    {
        path: 'me',
        canActivate: [connectedGuard],
        loadComponent: () =>
            import(
                '@features/users/pages/user-details-page/user-details-page'
            ).then((c) => c.UserDetailsPage),
    },
];
