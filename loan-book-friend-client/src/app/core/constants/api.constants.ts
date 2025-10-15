export const API_ROUTE_AUTH = 'auth';
export const API_ROUTE_AUTH_LOGIN = API_ROUTE_AUTH + '/signin';
export const API_ROUTE_AUTH_REGISTER = API_ROUTE_AUTH + '/signup';
export const API_ROUTE_AUTH_REFRESH_TOKEN = API_ROUTE_AUTH + '/refresh';
export const API_ROUTE_AUTH_LOGOUT = API_ROUTE_AUTH + '/signout';

const API_ROUTE_USER = 'user';
export const ApiRoutes = {
    user: {
        consumers: API_ROUTE_USER + '',
        all: API_ROUTE_USER + '/all',
    },
};
