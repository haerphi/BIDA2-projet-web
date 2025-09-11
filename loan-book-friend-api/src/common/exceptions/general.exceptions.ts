export class ServerErrorException extends Error {
    constructor() {
        super('api.exception.server_error_exception');
    }
}

export class NotFoundException extends Error {
    constructor(code: string = 'not_found_exception') {
        super('api.exception.' + code);
    }
}
