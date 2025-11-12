import { Component, input } from '@angular/core';
import { BookDetails } from '@core/models';

@Component({
    selector: 'app-book-details-display',
    imports: [],
    templateUrl: './book-details-display.html',
    styleUrl: './book-details-display.scss',
})
export class BookDetailsDisplay {
    bookDetails = input<BookDetails | null>(null);
    // TODO Implementation for displaying book loan history goes here
}
