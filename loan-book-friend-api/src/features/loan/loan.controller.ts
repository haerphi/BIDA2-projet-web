import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoanService } from '@loan/services';
import {
    LoanCreateDto,
    LoanListDto,
    LoanDetailsDto,
    LoanGetQueryDto,
} from '@loan/dtos';
import { RequireRoles } from '@security/guards';
import { UserEntity } from '@user/models';
import { User } from '@security/metadata';

import { toLoanDetailsDto, toLoanListDto } from '@loan/mappers';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    CreateLoanApiOperationDocumentation,
    CreateLoanApiResponseDocumentation,
} from '@loan/loan.swagger';

@ApiCookieAuth('access_token')
@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @ApiOperation(CreateLoanApiOperationDocumentation)
    @ApiResponse(CreateLoanApiResponseDocumentation)
    @RequireRoles()
    @Post()
    async createLoan(
        @User() requester: UserEntity,
        @Body() createLoanDto: LoanCreateDto,
    ): Promise<LoanDetailsDto> {
        const loan = await this.loanService.createLoan(
            requester.user_id,
            createLoanDto.bookId,
            createLoanDto.borrowerId,
        );

        return toLoanDetailsDto(loan);
    }

    @RequireRoles()
    @Get()
    async getLoans(
        @User() requester: UserEntity,
        @Query() params: LoanGetQueryDto,
    ): Promise<LoanListDto[]> {
        const loans = await this.loanService.getAllLoans(
            requester.user_id,
            params.asBorrower,
            params.asLender,
            params.page,
            params.limit,
        );

        console.log(loans);

        return loans.map((l) => toLoanListDto(l, requester.user_id));
    }
}
