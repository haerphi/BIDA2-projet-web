export const toSignInResponse = (token: string, refreshToken: string) => {
    return { token, refreshToken };
};
