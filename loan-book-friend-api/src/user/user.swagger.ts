import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { UserEntity } from './models';
import { UserListDto } from './dtos';

// getConsumer
export const GetConsumerApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Get the connected user',
    description: 'This route allows to get details of the connected user',
};

export const GetConsumerApiResponseDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'The connected user details',
    type: UserEntity,
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
};
