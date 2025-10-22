import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
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
    summary: 'Get all users',
    description: 'This route allows to get a list of all users',
};

export const GetAllUsersApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'List of all users',
    type: UserListDto,
    isArray: true,
};

// getById
export const GetUserByIdApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get user by ID',
    description: 'This route allows to get details of a user by their ID',
};

export const GetUserByIdApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The user details',
    type: UserDetailsDto,
};
