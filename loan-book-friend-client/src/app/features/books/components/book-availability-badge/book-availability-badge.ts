import { Component, input } from '@angular/core';
import { BookAvailability } from '@core/constants';

@Component({
    selector: 'app-book-availability-badge',
    imports: [],
    templateUrl: './book-availability-badge.html',
    styleUrl: './book-availability-badge.scss',
})
export class BookAvailabilityBadge {
    protected readonly BookAvailability = BookAvailability;

    availability = input.required<BookAvailability>();
}
