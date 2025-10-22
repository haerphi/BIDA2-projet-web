import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { BookCreateDto, BookUserListDto } from './dtos';

// getOwnedBooks
export const GetOwnedBooksApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get all books owned by the connected user',
    description:
        'This route allows to get a list of all books owned by the connected user',
};

export const GetOwnedBooksApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all books owned by the connected user',
    type: BookUserListDto,
    isArray: true,
};

// getBooks
export const GetBooksApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get all books',
    description: 'This route allows to get a list of all books',
};

export const GetBooksApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all books',
    type: BookUserListDto,
    isArray: true,
};

// createBook
export const CreateBookApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Create a new book',
    description: 'This route allows to create a new book',
};

export const CreateBookApiResponseDocumentation: ApiResponseOptions = {
    status: 201,
    description: 'The created book',
    type: BookCreateDto,
};
