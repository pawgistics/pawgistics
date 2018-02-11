// @flow

import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';
import type { fromJS as Immut } from 'immutable';

import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/auth';

const initialState = Immutable.fromJS({
  isAuthenticated: false,
  token: null,
  isAdmin: false,
});

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticated: true,
        token: action.payload.token,
        isAdmin: jwtDecode(action.payload.token).admin,
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        isAuthenticated: false,
        token: null,
        isAdmin: false,
      });

    default:
      return state;
  }
};

export default authReducer;
