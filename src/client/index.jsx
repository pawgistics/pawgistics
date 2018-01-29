// @flow

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';

import App from './app';
import { store, persistor } from './store';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

import './styles/global/styles.scss';

viewportUnitsBuggyfill.init();

declare var PROD: boolean;

const rootEl: Element = (document.querySelector(APP_CONTAINER_SELECTOR): any);

let wrapApp;

if (PROD) {
  wrapApp = (AppComponent, reduxStore) => (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
} else {
  // eslint-disable-next-line
  const { AppContainer } = require('react-hot-loader');

  wrapApp = (AppComponent, reduxStore) => (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppContainer>
            <AppComponent />
          </AppContainer>
        </BrowserRouter>
      </PersistGate>
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
