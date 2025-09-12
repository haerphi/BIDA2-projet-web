import { ApiOperationOptions } from '@nestjs/swagger';

export const SignInDocumentation: ApiOperationOptions = {
    summary: 'Connect a user',
    description: 'This route allows a user to sign in',
};

export const SignUpDocumentation: ApiOperationOptions = {
    summary: 'Register a user',
    description: 'This route allows a user to sign up',
};
