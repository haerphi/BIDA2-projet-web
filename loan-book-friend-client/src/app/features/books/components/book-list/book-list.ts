import { Component, input, output } from '@angular/core';
import { Spinner } from '@components/commons/loadings/spinner/spinner';
import { BookAvailability } from '@core/constants';
import { BookListOwned, BookListOwnedQueryParams } from '@core/models';
import { Spoil } from '@components/commons/spoil/spoil';
import { FormsModule } from '@angular/forms';
import { BookCondition } from '@core/constants/book-condition.enum';

@Component({
    selector: 'app-book-list',
    imports: [Spinner, Spoil, FormsModule],
    templateUrl: './book-list.html',
    styleUrl: './book-list.scss',
})
export class BookList {
    protected readonly BookAvailability = BookAvailability;

    books = input.required<BookListOwned[]>();
    loading = input<boolean>(false);

    filterBooks = output<BookListOwnedQueryParams>();

    searchTitleInput = '';
    searchAuthorInput = '';
    searchConditionInput: BookCondition | undefined = undefined;
    searchAvailabilityInput: BookAvailability | undefined = undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blurInput(event: any): void {
        console.log(event.currentTarget.blur());
    }

    onSearchChange(): void {
        const filters: BookListOwnedQueryParams = {};

        if (this.searchTitleInput.trim()) {
            filters.title = this.searchTitleInput.trim();
        }
        if (this.searchAuthorInput.trim()) {
            filters.author = this.searchAuthorInput.trim();
        }
        if (this.searchConditionInput) {
            filters.condition = this.searchConditionInput;
        }
        if (this.searchAvailabilityInput) {
            filters.availability = this.searchAvailabilityInput;
        }

        this.filterBooks.emit(filters);
    }

    onResetFilers(): void {
        this.searchTitleInput = '';
        this.searchAuthorInput = '';
        this.searchConditionInput = undefined;
        this.searchAvailabilityInput = undefined;

        this.filterBooks.emit({});
    }
}
