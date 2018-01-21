// @flow

import 'isomorphic-fetch';

import { createAction } from 'redux-actions';
import { apiLoginRoute } from '../../shared/routes';

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const requestLogin = createAction(LOGIN_REQUEST, () => ({
  isFetching: true,
  errMsg: null,
}));

export const receiveLogin = createAction(LOGIN_SUCCESS, user => ({
  isFetching: false,
  isAuthenticated: true,
  token: user.token,
}));

export const loginError = createAction(LOGIN_FAILURE, message => ({
  isFetching: false,
  errMsg: message,
}));

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin());

    return fetch(apiLoginRoute, config)
      .then(response => response.json().then(response_data => ({ response_data, response })))
      .then(({ response_data, response }) => {
        if (!response.ok) {
          // Dispatch the error condition
          dispatch(loginError(response_data.message));
        } else {
          // Dispatch the success action
          dispatch(receiveLogin(response_data));
        }
      // eslint-disable-next-line no-console
      }).catch(err => console.log('Error: ', err));
  };
}
