export class AreNotFriendException extends Error {
    constructor() {
        super('api.exception.are_not_friend_exception');
    }
}

export class BookNotAvailableException extends Error {
    constructor() {
        super('api.exception.book_not_available_exception');
    }
}
