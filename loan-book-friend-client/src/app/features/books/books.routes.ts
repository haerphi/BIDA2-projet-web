import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'create',
        loadComponent: () =>
            import(
                '@features/books/pages/book-create-page/book-create-page'
            ).then((c) => c.BookCreatePage),
    },
];
