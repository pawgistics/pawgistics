// @flow

import { combineReducers } from 'redux';

import hello from './hello';
import auth from './auth';

const rootReducer = combineReducers({
  hello,
  auth,
});

export default rootReducer;
