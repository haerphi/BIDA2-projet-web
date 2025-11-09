import { SignInResponse } from '../dtos/sign-in.dto';
import { UserRole } from '../enums';

export const toSignInResponse = (
    tokenIat: number,
    refreshTokenIat: number,
    role: UserRole,
): SignInResponse => {
    return { tokenIat, refreshTokenIat, role };
};
