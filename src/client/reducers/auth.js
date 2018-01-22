// @flow

import Immutable from 'immutable';
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
  errMsg: '',
});

const authReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default authReducer;
