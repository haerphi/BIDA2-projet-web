import { Component, input } from '@angular/core';
import { BookUserList } from '@core/models';

@Component({
    selector: 'app-book-list',
    imports: [],
    templateUrl: './book-list.html',
    styleUrl: './book-list.scss',
})
export class BookList {
    books = input.required<BookUserList[]>();
}
