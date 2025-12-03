import { Component, input } from '@angular/core';
import { Spinner } from '@components/commons/loadings/spinner/spinner';
import { BookUserList } from '@core/models';

@Component({
    selector: 'app-book-list',
    imports: [Spinner],
    templateUrl: './book-list.html',
    styleUrl: './book-list.scss',
})
export class BookList {
    books = input.required<BookUserList[]>();
    loading = input<boolean>(false);
}
