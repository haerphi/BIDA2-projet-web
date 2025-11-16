import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingModal } from '@components/commons/modals/loading-modal/loading-modal';
import { BookDetails } from '@core/models';
import { BookService } from '@core/services';
import { BookEditForm } from '@features/books/components/book-edit-form/book-edit-form';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-book-edit-page',
    imports: [BookEditForm, LoadingModal, RouterLink],
    templateUrl: './book-edit-page.html',
    styleUrl: './book-edit-page.scss',
})
export class BookEditPage implements OnInit {
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _bookService = inject(BookService);
    private readonly _router = inject(Router);

    bookId: string | null = null;
    bookDetails: BookDetails | null = null;
    bookError: string | null = null;

    isLoading = true;

    subscriptions: Subscription[] = [];

    async ngOnInit(): Promise<void> {
        this.subscriptions.push(
            this._activatedRoute.params.subscribe((params) => {
                this.bookId = params['id'];
                if (this.bookId) {
                    this.getBookDetails(this.bookId);
                } else {
                    this.bookError = 'No book ID provided in the route.';
                    this.isLoading = false;
                }
            }),
        );
    }

    private getBookDetails(bookId: string): void {
        this.isLoading = true;
        this._bookService
            .getBookById(bookId)
            .then((book) => {
                // TODO : remove artificial delay
                setTimeout(() => {
                    this.bookDetails = book;
                    this.isLoading = false;
                }, 1000);
            })
            .catch((error) => {
                this.bookError =
                    error.message ||
                    'An error occurred while fetching book details.';
            });
    }

    onBookUpdated(): void {
        this._router.navigate(['/books', this.bookId]);
    }
}
