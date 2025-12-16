import { Component, effect, input, output, signal } from '@angular/core';
import { Spinner } from '@components/commons/loadings/spinner/spinner';
import { BookAvailability } from '@core/constants';
import { BookListOwned, BookListOwnedQueryParams } from '@core/models';
import { Spoil } from '@components/commons/spoil/spoil';
import { FormsModule } from '@angular/forms';
import { BookCondition } from '@core/constants/book-condition.enum';
import { debounceSignal } from '@core/utils/signal.utils';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-book-list',
    imports: [Spinner, Spoil, FormsModule, RouterLink],
    templateUrl: './book-list.html',
    styleUrl: './book-list.scss',
})
export class BookList {
    protected readonly BookCondition = BookCondition;
    protected readonly BookAvailability = BookAvailability;

    books = input.required<BookListOwned[]>();
    loading = input<boolean>(false);

    searchTitleInput = signal<string>('');
    searchTitleDebounced = debounceSignal(this.searchTitleInput, 400, '');
    searchAuthorInput = signal<string>('');
    searchAuthorDebounced = debounceSignal(this.searchAuthorInput, 400, '');
    searchConditionInput = signal<BookCondition | undefined>(undefined);
    searchAvailabilityInput = signal<BookAvailability | undefined>(undefined);

    filterBooks = output<BookListOwnedQueryParams>();

    constructor() {
        effect(() => {
            const filters: BookListOwnedQueryParams = {};

            if (this.searchTitleDebounced()) {
                filters.title = this.searchTitleDebounced();
            }

            if (this.searchAuthorDebounced()) {
                filters.author = this.searchAuthorDebounced();
            }

            if (this.searchConditionInput()) {
                filters.condition = this.searchConditionInput()!;
            }

            if (this.searchAvailabilityInput()) {
                filters.availability = this.searchAvailabilityInput()!;
            }

            this.onSearchChange(filters);
        });
    }

    onSearchChange(filters: BookListOwnedQueryParams): void {
        const validFilters: BookListOwnedQueryParams = {};
        if (filters.title && filters.title.trim()) {
            validFilters.title = filters.title.trim();
        }

        if (filters.author && filters.author.trim()) {
            validFilters.author = filters.author.trim();
        }

        if (filters.condition) {
            validFilters.condition = filters.condition;
        }

        if (filters.availability) {
            validFilters.availability = filters.availability;
        }

        this.filterBooks.emit(filters);
    }

    onResetFilers(): void {
        this.searchTitleInput.set('');
        this.searchAuthorInput.set('');
        this.searchConditionInput.set(undefined);
        this.searchAvailabilityInput.set(undefined);

        this.filterBooks.emit({});
    }
}
