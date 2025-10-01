export interface CredentialEmail {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    refreshToken: string;
}
