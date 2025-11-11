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

// getBooksOwnedById
export const GetBooksOwnedByIdApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get all books owned by a specific user (admin)',
    description:
        'This route allows to get a list of all books owned by a specific user',
};

export const GetBooksOwnedByIdApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all books owned by the specific user',
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

// DeleteOwnedBook
export const DeleteOwnedBookApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Delete a book owned by the connected user',
    description:
        'This route allows to delete a book owned by the connected user',
};

export const DeleteOwnedBookApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The book has been deleted successfully',
};

// Delete book (admin)
export const DeleteBookApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Delete a book by id (admin)',
    description: 'This route allows to delete a book by id',
};

export const DeleteBookApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The book has been deleted successfully',
};
