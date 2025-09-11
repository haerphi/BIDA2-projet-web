export class EmailAlreadyExistException extends Error {
    constructor() {
        super('api.exception.email_already_exists');
    }
}

export class NameAlreadyExistException extends Error {
    constructor() {
        super('api.exception.name_already_exists');
    }
}
