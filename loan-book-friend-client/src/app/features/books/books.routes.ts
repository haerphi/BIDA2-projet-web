import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'create',
        loadComponent: () =>
            import(
                '@features/books/pages/book-create-page/book-create-page'
            ).then((c) => c.BookCreatePage),
    },
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
