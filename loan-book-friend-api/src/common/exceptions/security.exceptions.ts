import { NotFoundException } from './general.exceptions';

export class CredentialNotFoundException extends NotFoundException {
    constructor() {
        super('credential_not_found_exception');
    }
}

export class WrongCredentialException extends Error {
    constructor() {
        super('api.exception.wrong_credential_exception');
    }
}

export class TokenGenerationException extends Error {
    constructor() {
        super('api.exception.token_generation_exception');
    }
}

export class TokenExpiredException extends Error {
    constructor() {
        super('api.exception.token_expired_exception');
    }
}
