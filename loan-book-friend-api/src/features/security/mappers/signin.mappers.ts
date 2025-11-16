import { SignInResponse } from '@security/dtos';
import { UserRole } from '@security/enums';

export const toSignInResponse = (
    tokenIat: number,
    refreshTokenIat: number,
    role: UserRole,
): SignInResponse => {
    return { tokenIat, refreshTokenIat, role };
};
