import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { UserEntity } from './models';

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
