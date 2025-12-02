import {
    ApiOperationOptions,
    ApiResponseOptions,
    getSchemaPath,
} from '@nestjs/swagger';
import { UserDetailsDto, UserListDto } from './dtos';

// getConsumer
export const GetConsumerApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get the connected user',
    description: 'This route allows to get details of the connected user',
};

export const GetConsumerApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The connected user details',
    type: UserDetailsDto,
};

// getAllUsers
export const GetAllUsersApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get all users (admin)',
    description: 'This route allows to get a list of all users',
};

export const GetAllUsersApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all users',
    schema: {
        allOf: [
            {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(UserListDto) },
                    },
                    total: {
                        type: 'number',
                    },
                },
            },
        ],
    },
};

// getById
export const GetUserByIdApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get user by ID (admin)',
    description: 'This route allows to get details of a user by their ID',
};

export const GetUserByIdApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The user details',
    type: UserDetailsDto,
};

// deleteSelf
export const DeleteSelfApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Delete the connected user',
    description:
        'This route allows the connected user to delete their own account',
};

export const DeleteSelfApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The connected user has been deleted successfully',
};

// deleteUser
export const DeleteUserApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Delete a user by ID (admin)',
    description: 'This route allows to delete a user by their ID',
};

export const DeleteUserApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The user has been deleted successfully',
};

// updateSelf
export const updateSelfApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Update the connected user',
    description:
        'This route allows the connected user to update their own account',
};

export const updateSelfApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The connected user has been updated successfully',
};

// updateUser
export const updateUserApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Update a user by ID (admin)',
    description: 'This route allows to update a user by their ID',
};

export const updateUserApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The user has been updated successfully',
};
