// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';

import App from './app';
import { store, persistor } from './store';

import './styles/global/styles.scss';

viewportUnitsBuggyfill.init();

const rootEl: Element = (document.querySelector('.app'): any);

render(
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  ), rootEl,
);
