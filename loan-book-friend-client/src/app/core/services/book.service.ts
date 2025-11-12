import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants';
import { BookForm, BookUserList } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

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

    getAllOwnedBooks(): Promise<BookUserList[]> {
        return firstValueFrom(
            this._httpClient.get<BookUserList[]>(
                this._baseUrl + ApiRoutes.book.owned,
            ),
        );
    }

    getAllBooksByOwner(userId: string): Promise<BookUserList[]> {
        return firstValueFrom(
            this._httpClient.get<BookUserList[]>(
                this._baseUrl + ApiRoutes.book.ownedBy + userId,
            ),
        );
    }

    async deleteBook(bookId: string): Promise<void> {
        await firstValueFrom(
            this._httpClient.delete<void>(
                this._baseUrl + ApiRoutes.book.delete + bookId,
            ),
        );
    }

    getBookById(bookId: string): Promise<BookUserList> {
        return firstValueFrom(
            this._httpClient.get<BookUserList>(
                this._baseUrl + ApiRoutes.book.byId + bookId,
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
