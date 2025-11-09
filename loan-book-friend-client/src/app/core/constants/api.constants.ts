const API_ROUTE_USER = 'user';
const API_ROUTE_BOOK = 'book';
const API_ROUTE_AUTH = 'auth';

export const ApiRoutes = {
    auth: {
        login: API_ROUTE_AUTH + '/signin',
        register: API_ROUTE_AUTH + '/signup',
        refresh: API_ROUTE_AUTH + '/refresh',
        logout: API_ROUTE_AUTH + '/signout',
    },
    user: {
        consumers: API_ROUTE_USER + '',
        all: API_ROUTE_USER + '/all',
        byId: API_ROUTE_USER + '/',
        delete: API_ROUTE_USER + '/delete',
    },
    book: {
        create: API_ROUTE_BOOK + '',
        owned: API_ROUTE_BOOK + '/owned/',
    },
};
