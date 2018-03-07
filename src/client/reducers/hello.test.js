import {
  sayHello,
  sayHelloAsyncRequest,
  sayHelloAsyncSuccess,
  sayHelloAsyncFailure,
} from '../actions/hello';

import helloReducer from './hello';

let helloState;

beforeEach(() => {
  helloState = helloReducer(undefined, {});
});

test('handle default', () => {
  expect(helloState.message).toBe('Initial reducer message');
  expect(helloState.messageAsync).toBe('Initial reducer message for async call');
});

test('handle SAY_HELLO', () => {
  helloState = helloReducer(helloState, sayHello('Test'));
  expect(helloState.message).toBe('Test');
});

test('handle SAY_HELLO_ASYNC_REQUEST', () => {
  helloState = helloReducer(helloState, sayHelloAsyncRequest());
  expect(helloState.messageAsync).toBe('Loading...');
});

test('handle SAY_HELLO_ASYNC_SUCCESS', () => {
  helloState = helloReducer(helloState, sayHelloAsyncSuccess('Test async'));
  expect(helloState.messageAsync).toBe('Test async');
});

test('handle SAY_HELLO_ASYNC_FAILURE', () => {
  helloState = helloReducer(helloState, sayHelloAsyncFailure());
  expect(helloState.messageAsync).toBe('No message received, please check your connection');
});
