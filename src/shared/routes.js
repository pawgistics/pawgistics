// @flow

export const HOME_PAGE_ROUTE = '/';
export const LOGIN_PAGE_ROUTE = '/login';
export const HELLO_PAGE_ROUTE = '/hello';
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async';
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404';

export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`;
export const apiRegisterRoute = '/api/auth/register';
export const apiLoginRoute = '/api/auth/login';