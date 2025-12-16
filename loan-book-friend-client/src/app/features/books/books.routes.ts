import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':id/edit',
        loadComponent: () =>
            import('@features/books/pages/book-edit-page/book-edit-page').then(
                (c) => c.BookEditPage,
            ),
    },
    {
        path: ':id',
        loadComponent: () =>
            import(
                '@features/books/pages/book-details-page/book-details-page'
            ).then((c) => c.BookDetailsPage),
    },
];
