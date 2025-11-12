import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { SignInResponse } from './dtos';

// signIn
export const SignInApiOperationDocumentation: ApiOperationOptions = {
    summary: 'Connect a user',
    description: 'This route allows a user to sign in',
};

export const SignInApiResponsesDocumentation: ApiResponseOptions = {
    status: 200,
    description: 'Todo item successfully created.',
    type: SignInResponse,
};

// signUp
export const SignUpDocumentation: ApiOperationOptions = {
    summary: 'Register a user',
    description: 'This route allows a user to sign up',
};
