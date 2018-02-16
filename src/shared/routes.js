// @flow

export const HOME_PAGE_ROUTE = '/';
export const LOGIN_PAGE_ROUTE = '/login';
export const USER_MANAGEMENT_PAGE_ROUTE = '/userManagement';
export const DOG_DETAIL_PAGE_ROUTE = '/dogDetail';
export const DOGS_PAGE_ROUTE = '/dogs';
export const ADMIN_PANEL_PAGE_ROUTE = '/admin';
export const DOG_MANAGEMENT_PAGE_ROUTE = '/dogManagement';
export const USER_EDIT_PAGE_ROUTE = '/userEdit';
export const USER_DETAIL_PAGE_ROUTE = '/userDetail';
export const ADD_DOG_PAGE_ROUTE = '/addDog';
export const DOG_EDIT_PAGE_ROUTE = '/dogEdit';

export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`;
export const apiRegisterRoute = '/api/auth/register';
export const apiLoginRoute = '/api/auth/login';
