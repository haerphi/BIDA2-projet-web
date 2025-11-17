import {
    ApiOperationOptions,
    ApiResponseOptions,
    getSchemaPath,
} from '@nestjs/swagger';
import { LoanDetailsDto, LoanListDto } from '@loan/dtos';
import { ListApiResponseDto } from '@common/dtos';

// createLoan
export const CreateLoanApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Create a new loan',
    description: 'This route allows to create a new loan for a book',
};

export const CreateLoanApiResponseDocumentation: ApiResponseOptions = {
    status: 201,
    description: 'The created loan details',
    type: LoanDetailsDto,
};

// getLoans
export const GetLoansApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get loans',
    description:
        'This route allows to get loans where the user is either the borrower or the lender',
};

export const GetLoansApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of loans',
    schema: {
        allOf: [
            {
                $ref: getSchemaPath(ListApiResponseDto),
            },
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(LoanListDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// returnLoan
export const ReturnLoanApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Return a loaned book',
    description: 'This route allows to return a loaned book',
};

export const ReturnLoanApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The loan has been successfully returned',
};
