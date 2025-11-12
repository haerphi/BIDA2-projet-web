import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookDetails } from '@core/models';
import { BookService } from '@core/services';
import { Subscription } from 'rxjs';
import { BookDetailsDisplay } from '@features/books/components/book-details-display/book-details-display';

@Component({
    selector: 'app-book-details-page',
    imports: [BookDetailsDisplay, RouterLink],
    templateUrl: './book-details-page.html',
    styleUrl: './book-details-page.scss',
})
export class BookDetailsPage implements OnInit {
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _bookService = inject(BookService);

    bookDetails: BookDetails | null = null;
    bookError: string | null = null;

    subscriptions: Subscription[] = [];

    async ngOnInit(): Promise<void> {
        this.subscriptions.push(
            this._activatedRoute.params.subscribe(async (params) => {
                const bookId = params['id'];
                this.getBookDetails(bookId);
                // TODO this.getBookLoanHistory(bookId);
            }),
        );
    }

    private getBookDetails(bookId: string): void {
        this._bookService
            .getBookById(bookId)
            .then((book) => {
                setTimeout(() => {
                    this.bookDetails = book;
                }, 1000);
            })
            .catch((error) => {
                this.bookError =
                    error.message ||
                    'An error occurred while fetching book details.';
            });
    }

    // TODO Implementation for fetching book loan history goes here
    // private async getBookLoanHistory(bookId: string): Promise<void> {
    // }
}
