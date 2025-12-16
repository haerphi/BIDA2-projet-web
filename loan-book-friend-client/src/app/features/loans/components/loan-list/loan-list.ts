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
    protected readonly LoanStatusEnum = LoanStatusEnum;

    loans = input.required<LoanGetListDto[]>();
    borrowed = input.required<BorrowedGetListDto[]>();
    loading = input<boolean>(false);

    filterLoans = output<LoanStatusEnum | null>();

    displayMode: DisplayMode = DisplayMode.Loans;
    filterLoan: LoanStatusEnum | null = null;

    onDisplayModeChange(mode: DisplayMode) {
        this.displayMode = mode;
    }

    onFilterLoanChange(status: LoanStatusEnum | null) {
        if (this.filterLoan === status) {
            this.filterLoan = null;
        } else {
            this.filterLoan = status;
        }
        this.filterLoans.emit(this.filterLoan);
    }
}
