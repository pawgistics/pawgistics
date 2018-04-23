// @flow

import _ from 'lodash';
import { stringify } from 'querystringify';

// CLIENT

export const HOME_PAGE_ROUTE = '/';
export const LOGIN_PAGE_ROUTE = '/login';

export const REQUESTS_PAGE_ROUTE = '/requests';
export const REQUEST_DETAIL_PAGE_ROUTE = '/request/:id';
export const requestDetailPageRoute = id => `/request/${id}`;

export const DOGS_PAGE_ROUTE = '/dogs';
export const ADD_DOG_PAGE_ROUTE = '/dogs/add';
export const DOG_DETAIL_PAGE_ROUTE = '/dog/:id';
export const dogDetailPageRoute = id => `/dog/${id}`;
export const EDIT_DOG_PAGE_ROUTE = '/dog/:id/edit';
export const editDogPageRoute = id => `/dog/${id}/edit`;
export const REQUEST_DOG_PAGE_ROUTE = '/dog/:id/request';
export const requestDogPageRoute = id => `/dog/${id}/request`;

export const USERS_PAGE_ROUTE = '/users';
export const ADD_USER_PAGE_ROUTE = '/users/add';
export const USER_DETAIL_PAGE_ROUTE = '/user/:id';
export const userDetailPageRoute = id => `/user/${id}`;
export const EDIT_USER_PAGE_ROUTE = '/user/:id/edit';
export const editUserPageRoute = id => `/user/${id}/edit`;

export const FOSTERS_PAGE_ROUTE = '/fosters';
export const RETURN_DOG_PAGE_ROUTE = '/return';
export const ADD_LITTER_PAGE_ROUTE = '/litters';

// API

export const LOGIN_API_ROUTE = '/api/auth/login';

export const REQUESTS_API_ROUTE = '/api/checkouts';
export const requestsApiRoute = before => `/api/checkouts${before ? `?before=${before}` : ''}`;
export const requestApiRoute = id => `/api/checkouts/${id}`;

export const DOGS_API_ROUTE = '/api/dogs';
export const dogsApiRoute = filters => `/api/dogs${stringify(_.pickBy(filters, _.identity), true)}`;
export const dogApiRoute = id => `/api/dogs/${id}`;
export const dogOutingsApiRoute = (id, filters) => `/api/dogs/${id}/outings${stringify(_.pickBy(filters, _.identity), true)}`;

export const USERS_API_ROUTE = '/api/users';
export const INSTRUCTORS_API_ROUTE = '/api/users/instructors';
export const usersApiRoute = filters => `/api/users${stringify(_.pickBy(filters, _.identity), true)}`;
export const userApiRoute = id => `/api/users/${id}`;
export const userOutingsApiRoute = (id, filters) => `/api/users/${id}/outings${stringify(_.pickBy(filters, _.identity), true)}`;
export const MY_PROFILE_PAGE_ROUTE = '/me';

export const LITTERS_API_ROUTE = '/api/litters';
