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
          Authorization: `Bearer ${getState().auth.token}`,
        },
        body,
      }).then(response =>
        response.json()
          .then(responseData => ({ responseData, response }))
          .catch(() => ({ responseData: null, response })))
        .then(({ responseData, response }) => {
          if (response.ok) {
            // Resolve with response
            resolve(responseData);
          } else if (response.status === 401) {
            // Unauthorized, logout the user
            dispatch(logoutAction());
            reject(Error('Unauthorized'));
          } else {
            if (responseData) {
              // Reject with error message from server
              reject(Error(responseData.message));
            } else {
              // Server returned invalid JSON, reject
              reject(Error('Invalid response from server.'));
            }
            // Reject with raw response object
            reject(response);
          }
        })
        // Reject with connection error
        .catch(() => reject(Error('Failed to connect to server.')));
    });
}
