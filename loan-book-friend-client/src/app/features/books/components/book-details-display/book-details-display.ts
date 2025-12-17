import { Component, effect, input } from '@angular/core';
import { BookDetails } from '@core/models';
import { DatePipe, NgClass } from '@angular/common';
import { BookAvailabilityBadge } from '@features/books/components/book-availability-badge/book-availability-badge';

@Component({
    selector: 'app-book-details-display',
    imports: [DatePipe, BookAvailabilityBadge, NgClass],
    templateUrl: './book-details-display.html',
    styleUrl: './book-details-display.scss',
})
export class BookDetailsDisplay {
    protected readonly Now = Date.now();

    bookDetails = input<BookDetails | null>(null);
    displayOwner = input<boolean>(false);

    constructor() {
        effect(() => {
            console.log('Book Details Updated:', this.bookDetails());
        });
    }
}
