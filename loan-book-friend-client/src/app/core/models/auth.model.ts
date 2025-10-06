export interface CredentialEmail {
    email: string;
    password: string;
}

export interface SignInResponse {
    tokenIat: number;
    refreshTokenIat: number;
}
