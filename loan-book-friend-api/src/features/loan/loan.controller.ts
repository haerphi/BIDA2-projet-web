import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { LoanService } from '@loan/services';

import { ApiCookieAuth } from '@nestjs/swagger';
import { RequireRoles } from '@security/guards';
import {
    LoanCreateForm,
    LoanGetListWithBookDto,
    LoanGetListQueryDto,
} from '@loan/dtos';
import { UserEntity } from '@user/models';
import { User } from '@security/metadata';
import { LoanEntity } from '@loan/models';
import { ListApiResponseDto } from '@common/dtos';
import { loanEntityToLoanGetListWithBookDto } from '@loan/mappers';
import { BorrowedGetListDto } from '@loan/dtos/borrowed-get-list.dto';
import { loanEntityToBorrowedGetListDto } from '@loan/mappers/to-borrowed-get-list.mappers';
import { BorrowGetListQueryDto } from '@loan/dtos/borrow-get-list-query.dto';

@ApiCookieAuth('access_token')
@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @RequireRoles()
    @Post()
    async createLoan(
        @User() requesterId: UserEntity,
        @Body() body: LoanCreateForm,
    ): Promise<LoanEntity> {
        return this.loanService.createLoan(
            body.bookId,
            requesterId.userId,
            body.borrowerId,
            body.returnDate,
        );
    }

    @RequireRoles()
    @Patch(':loanId/return')
    async returnLoan(
        @User() requesterId: UserEntity,
        @Body('loanId') loanId: string,
    ): Promise<void> {
        await this.loanService.returnLoan(loanId, requesterId.userId);
    }

    @RequireRoles()
    @Get('loaned-books')
    async getLoanedBooks(
        @User() requester: UserEntity,
        @Query() query: LoanGetListQueryDto,
    ): Promise<ListApiResponseDto<LoanGetListWithBookDto>> {
        const { total, loans } = await this.loanService.getLoanedBooks(
            requester.userId,
            query,
        );
        return { total, data: loans.map(loanEntityToLoanGetListWithBookDto) };
    }

    @RequireRoles()
    @Get('borrowed-books')
    async getBorrowedBooks(
        @User() requester: UserEntity,
        @Query() query: BorrowGetListQueryDto,
    ): Promise<ListApiResponseDto<BorrowedGetListDto>> {
        const { total, loans } = await this.loanService.getBorrowedBooks(
            requester.userId,
            query,
        );
        return { total, data: loans.map(loanEntityToBorrowedGetListDto) };
    }
}
