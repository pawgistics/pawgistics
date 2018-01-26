// @flow

import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';
import type { fromJS as Immut } from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/login';

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/logout';

const initialState = Immutable.fromJS({
  isFetching: false,
  isAuthenticated: false,
  token: null,
  isAdmin: false,
  errMsg: null,
});

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return state.merge({
        isFetching: true,
        errMsg: null,
      });

    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token,
        isAdmin: jwtDecode(action.payload.token).admin,
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        token: null,
        isAdmin: false,
      });

    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return state.merge({
        isFetching: false,
        errMsg: action.payload.message,
      });

    default:
      return state;
  }
};

export default authReducer;
