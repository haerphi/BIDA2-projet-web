export class NameOrEmailIsRequired extends Error {
    constructor() {
        super('api.exception.name_or_email_is_required');
    }
}
