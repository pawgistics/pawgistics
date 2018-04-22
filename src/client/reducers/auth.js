// @flow

import Immutable from 'seamless-immutable';
import type Immut from 'seamless-immutable';
import jwtDecode from 'jwt-decode';

import {
  LOGIN,
  LOGOUT,
} from '../actions/auth';

const initialState = Immutable({
  isAuthenticated: false,
  token: null,
  isAdmin: false,
});

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOGIN:
      return state.merge({
        isAuthenticated: true,
        token: action.payload.token,
        isAdmin: jwtDecode(action.payload.token).admin,
        id: jwtDecode(action.payload.token).id,
      });
    case LOGOUT:
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
