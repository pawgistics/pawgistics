// @flow

import 'isomorphic-fetch';

import { createAction } from 'redux-actions';
import { apiLoginRoute } from '../../shared/routes';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = createAction(LOGIN, token => ({ token }));
export const logoutAction = createAction(LOGOUT);

// Call API to log in user
export function loginUser(creds) {
  return dispatch =>
    // eslint-disable-next-line compat/compat
    new Promise((resolve, reject) => {
      fetch(apiLoginRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      }).then(response => response.json().then(responseData => ({ responseData, response })))
        .then(({ responseData, response }) => {
          if (response.ok) {
            // Resolve with no error message, and dispatch authentication information to the store
            resolve();
            dispatch(loginAction(responseData.token));
          } else {
            // Reject with error message
            reject(responseData.message);
          }
        // eslint-disable-next-line no-console
        }).catch(err => console.log('Error: ', err));
    });
}

// Logs the user out
export function logoutUser() {
  return dispatch => dispatch(logoutAction());
}
