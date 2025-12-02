import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { LoanService } from '@loan/services';
import {
    LoanCreateDto,
    LoanListDto,
    LoanDetailsDto,
    LoanGetQueryDto,
    LoanReturnDto,
} from '@loan/dtos';
import { RequireRoles } from '@security/guards';
import { UserEntity } from '@user/models';
import { User } from '@security/metadata';

import { toLoanDetailsDto, toLoanListDto } from '@loan/mappers';
import {
    ApiCookieAuth,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import {
    CreateLoanApiOperationDocumentation,
    CreateLoanApiResponseDocumentation,
    GetLoansApiOperationDocumentation,
    GetLoansApiResponseDocumentation,
    ReturnLoanApiOperationDocumentation,
    ReturnLoanApiResponseDocumentation,
} from '@loan/loan.swagger';
import { ListApiResponseDto } from '@common/dtos';

@ApiCookieAuth('access_token')
@ApiExtraModels(LoanListDto, ListApiResponseDto)
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

        return toLoanDetailsDto(loan, requester.user_id);
    }

    @ApiOperation(GetLoansApiOperationDocumentation)
    @ApiResponse(GetLoansApiResponseDocumentation)
    @RequireRoles()
    @Get()
    async getLoans(
        @User() requester: UserEntity,
        @Query() params: LoanGetQueryDto,
    ): Promise<ListApiResponseDto<LoanListDto>> {
        const { total, loans } = await this.loanService.getAllLoans(
            requester.user_id,
            params,
        );

        return {
            total,
            data: loans.map((l) => toLoanListDto(l, requester.user_id)),
        };
    }

    @ApiOperation(ReturnLoanApiOperationDocumentation)
    @ApiResponse(ReturnLoanApiResponseDocumentation)
    @RequireRoles()
    @Patch()
    async returnLoan(
        @User() requester: UserEntity,
        @Body() body: LoanReturnDto,
    ): Promise<void> {
        await this.loanService.returnLoan(requester.user_id, body.loanId);
    }
}
