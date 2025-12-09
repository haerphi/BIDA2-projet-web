import { Component, input, output } from '@angular/core';
import { BorrowedGetListDto, LoanGetListDto } from '@core/models';
import { DatePipe, NgClass } from '@angular/common';
import { LoanStatusEnum } from '@core/constants';

enum DisplayMode {
    Loans,
    Borrowed,
}

@Component({
    selector: 'app-loan-list',
    imports: [NgClass, DatePipe],
    templateUrl: './loan-list.html',
    styleUrl: './loan-list.scss',
})
export class LoanList {
    protected readonly DisplayMode = DisplayMode;
    protected readonly Date = Date;

    loans = input.required<LoanGetListDto[]>();
    borrowed = input.required<BorrowedGetListDto[]>();
    loading = input<boolean>(false);

    filterLoans = output<LoanStatusEnum>();

    displayMode: DisplayMode = DisplayMode.Loans;

    onDisplayModeChange(mode: DisplayMode) {
        this.displayMode = mode;
    }
}
