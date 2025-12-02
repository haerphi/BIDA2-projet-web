import {
    ApiOperationOptions,
    ApiResponseOptions,
    getSchemaPath,
} from '@nestjs/swagger';
import { BookDetailsDto, BookListDto, BookUserListDto } from '@book/dtos';

// getAllBooksFromCurrentUser
export const GetAllBooksFromCurrentUserApiOperationDocumentation: ApiOperationOptions =
    {
        summary: 'Get all books owned by the connected user',
        description:
            'This route allows to get a list of all books owned by the connected user',
    };

export const GetAllBooksFromCurrentUserApiResponseDocumentation: ApiResponseOptions =
    {
        status: 200,
        description: 'List of all books owned by the connected user',
        schema: {
            allOf: [
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: getSchemaPath(BookUserListDto) },
                        },
                        total: {
                            type: 'number',
                        },
                    },
                },
            ],
        },
    };

// getAllBooksByOwner
export const GetAllBooksByOwnerApiOperationDocumentation: ApiOperationOptions =
    {
        summary: 'Get all books owned by a specific user (admin)',
        description:
            'This route allows to get a list of all books owned by a specific user',
    };

export const GetAllBooksByOwnerApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all books owned by the specific user',
    schema: {
        allOf: [
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(BookUserListDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// getAllBooks
export const GetAllBooksApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get all books',
    description: 'This route allows to get a list of all books',
};

export const GetAllBooksApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all books',
    schema: {
        allOf: [
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(BookListDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// createBook
export const CreateBookApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Create a new book',
    description: 'This route allows to create a new book',
};

export const CreateBookApiResponseDocumentation: ApiResponseOptions = {
    status: 201,
    description: 'The created book',
    type: BookUserListDto,
};

// deleteBook
export const DeleteBookApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Delete a book by id',
    description: 'This route allows to delete a book by id',
};

export const DeleteBookApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The book has been deleted successfully',
};

// getBookById
export const GetBookByIdApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get a book by id',
    description: 'This route allows to get a book by id',
};

export const GetBookByIdApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The book with the specified id',
    type: BookDetailsDto,
};

// updateBookById
export const UpdateBookByIdApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Update a book by id',
    description: 'This route allows to update a book by id',
};

export const UpdateBookByIdApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The book has been updated successfully',
};
