import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants';
import {
    ApiListResponse,
    BookDetails,
    BookForm,
    BookListOwned,
    BookListOwnedQueryParams,
} from '@core/models';
import { environment } from '@env';
import { firstValueFrom, map } from 'rxjs';
import { convertLoanDates } from '@core/services/loan.service';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    async create(book: BookForm): Promise<void> {
        await firstValueFrom(
            this._httpClient.post<void>(
                this._baseUrl + ApiRoutes.book.create,
                book,
            ),
        );
    }

    getAllOwnedBooks(
        queryParams?: BookListOwnedQueryParams,
    ): Promise<ApiListResponse<BookListOwned>> {
        return firstValueFrom(
            this._httpClient.get<ApiListResponse<BookListOwned>>(
                this._baseUrl + ApiRoutes.book.owned,
                {
                    params: queryParams as Record<string, string | number>,
                },
            ),
        );
    }

    getBookById(bookId: string): Promise<BookDetails> {
        return firstValueFrom(
            this._httpClient
                .get<BookDetails>(this._baseUrl + ApiRoutes.book.byId + bookId)
                .pipe(
                    map((bookDetails) => ({
                        ...bookDetails,
                        loans: bookDetails.loans.map(convertLoanDates),
                    })),
                ),
        );
    }

    updateBook(book: Partial<BookForm>, bookId: string): Promise<void> {
        return firstValueFrom(
            this._httpClient.put<void>(
                this._baseUrl + ApiRoutes.book.update + bookId,
                book,
            ),
        );
    }
}
