import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants';
import { BookCreate, BookUserList } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    async create(book: BookCreate): Promise<void> {
        await firstValueFrom(
            this._httpClient.post<void>(
                this._baseUrl + ApiRoutes.book.create,
                book,
            ),
        );
    }

    async getAllBooksByOwner(id?: string): Promise<BookUserList[]> {
        return await firstValueFrom(
            this._httpClient.get<BookUserList[]>(
                this._baseUrl + ApiRoutes.book.owned + (id ?? ''),
            ),
        );
    }
}
