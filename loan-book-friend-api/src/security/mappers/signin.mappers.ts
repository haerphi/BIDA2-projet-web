import { SignInResponse } from '@security/dtos/sign-in.dto';

export const toSignInResponse = (
    token: string,
    refreshToken: string,
): SignInResponse => {
    return { token, refreshToken };
};
