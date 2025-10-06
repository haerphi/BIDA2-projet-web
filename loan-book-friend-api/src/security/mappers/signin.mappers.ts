import { SignInResponse } from '@security/dtos/sign-in.dto';

export const toSignInResponse = (
    tokenIat: number,
    refreshTokenIat: number,
): SignInResponse => {
    return { tokenIat, refreshTokenIat };
};
