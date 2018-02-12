// @flow

import 'isomorphic-fetch';

import { logoutAction } from './auth';

// Call API to log in user
export default function apiCall(method, route, body) {
  return (dispatch, getState) =>
    // eslint-disable-next-line compat/compat
    new Promise((resolve, reject) => {
      fetch(route, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorizaton: `Bearer ${getState().auth.get('token')}`,
        },
        body,
      }).then(response => response.json().then(responseData => ({ responseData, response })))
        .then(({ responseData, response }) => {
          if (response.ok) {
            // Resolve with response
            resolve(responseData);
          } else {
            if (response.status === 401) {
              // Unauthorized, logout the user
              dispatch(logoutAction());
            }
            // Reject with raw response object
            reject(response);
          }
        // eslint-disable-next-line no-console
        }).catch(err => console.log('Error: ', err));
    });
}
