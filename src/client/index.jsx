// @flow

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './app';
import rootReducer from './reducers';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

declare var PROD: boolean;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (PROD ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

const rootEl: Element = (document.querySelector(APP_CONTAINER_SELECTOR): any);

let wrapApp;

if (PROD) {
  wrapApp = (AppComponent, reduxStore) => (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>
  );
} else {
  // eslint-disable-next-line
  const { AppContainer } = require('react-hot-loader');

  wrapApp = (AppComponent, reduxStore) => (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </Provider>
  );

  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const nextApp = require('./app').default;
    ReactDOM.render(wrapApp(nextApp, store), rootEl);
  });

  // flow-disable-next-line
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

ReactDOM.render(wrapApp(App, store), rootEl);
