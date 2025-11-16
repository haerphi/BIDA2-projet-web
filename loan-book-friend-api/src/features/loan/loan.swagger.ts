import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

// createLoan
export const CreateLoanApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Create a new loan',
    description: 'This route allows to create a new loan for a book',
};

export const CreateLoanApiResponseDocumentation: ApiResponseOptions = {
    status: 201,
    description: 'The created loan details',
    type: 'LoanDetailsDto', // Replace with actual DTO when available
};
