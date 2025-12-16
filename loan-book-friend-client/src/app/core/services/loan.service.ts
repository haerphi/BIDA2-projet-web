import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { firstValueFrom, map } from 'rxjs';
import {
    ApiListResponse,
    BorrowedGetListDto,
    BorrowGetListQueryDto,
    CreateLoanForm,
    LoanGetListDto,
    LoanGetListQueryDto,
} from '@core/models';

interface LoanWithDates {
    createdAt: string | Date;
    shouldBeReturnedAt: string | Date | null;
    returnedAt: string | Date | null;
}

@Injectable({
    providedIn: 'root',
})
export class LoanService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseUrl = environment.apiUrl;

    getLoans(
        query?: LoanGetListQueryDto,
    ): Promise<ApiListResponse<LoanGetListDto>> {
        return firstValueFrom(
            this._httpClient
                .get<ApiListResponse<LoanGetListDto>>(
                    `${this._baseUrl}loan/loaned-books`,
                    {
                        params: { ...query },
                    },
                )
                .pipe(
                    map((response) => {
                        response.data = response.data.map(convertLoanDates);
                        return response;
                    }),
                ),
        );
    }

    getBorrowedBooks(
        query?: BorrowGetListQueryDto,
    ): Promise<ApiListResponse<BorrowedGetListDto>> {
        return firstValueFrom(
            this._httpClient
                .get<ApiListResponse<BorrowedGetListDto>>(
                    `${this._baseUrl}loan/borrowed-books`,
                    {
                        params: { ...query },
                    },
                )
                .pipe(
                    map((response) => {
                        response.data = response.data.map(convertLoanDates);
                        return response;
                    }),
                ),
        );
    }

    createLoan(data: CreateLoanForm): Promise<void> {
        return firstValueFrom(
            this._httpClient.post<void>(`${this._baseUrl}loan`, data),
        );
    }
}

const convertLoanDates = <T extends LoanWithDates>(loan: T): T => {
    loan.createdAt = new Date(loan.createdAt as string);
    loan.shouldBeReturnedAt = loan.shouldBeReturnedAt
        ? new Date(loan.shouldBeReturnedAt as string)
        : null;
    loan.returnedAt = loan.returnedAt
        ? new Date(loan.returnedAt as string)
        : null;
    return loan;
};
