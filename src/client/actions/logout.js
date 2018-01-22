// @flow

import { createAction } from 'redux-actions';

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from the store. These actions would be more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const requestLogout = createAction(LOGOUT_REQUEST, () => ({
  isFetching: true,
  errMsg: '',
}));

export const receiveLogout = createAction(LOGOUT_SUCCESS, () => ({
  isFetching: false,
  isAuthenticated: false,
  token: null,
}));

export const logoutError = createAction(LOGOUT_FAILURE, message => ({
  isFetching: false,
  errMsg: message,
}));

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    dispatch(receiveLogout());
  };
}
