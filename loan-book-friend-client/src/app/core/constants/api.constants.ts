const API_ROUTE_USER = 'user';
const API_ROUTE_BOOK = 'book';
const API_ROUTE_AUTH = 'auth';

export const ApiRoutes = {
    auth: {
        login: API_ROUTE_AUTH + '/signin',
        register: API_ROUTE_AUTH + '/signup',
        refresh: API_ROUTE_AUTH + '/refresh',
        logout: API_ROUTE_AUTH + '/signout',
        changePassword: API_ROUTE_AUTH + '/password', // /!\ PATCH method
        changePasswordAdmin: API_ROUTE_AUTH + '/:userId/password', // /!\ PATCH method + replace :userId
    },
    user: {
        consumers: API_ROUTE_USER + '',
        all: API_ROUTE_USER + '/all',
        byId: API_ROUTE_USER + '/', // + userId
        delete: API_ROUTE_USER + '/', // + userId?
        update: API_ROUTE_USER + '/', // + userId?
    },
    book: {
        create: API_ROUTE_BOOK + '',
        owned: API_ROUTE_BOOK + '/owned/',
        ownedBy: API_ROUTE_BOOK + '/ownedby/', // + userId
        delete: API_ROUTE_BOOK + '/', // + bookId
        byId: API_ROUTE_BOOK + '/', // + bookId
        update: API_ROUTE_BOOK + '/', // + bookId
    },
};
