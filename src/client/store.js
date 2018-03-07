// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler, seamlessImmutableTransformer } from 'redux-persist-seamless-immutable';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [seamlessImmutableTransformer],
  stateReconciler: seamlessImmutableReconciler,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = (process.env.NODE_ENV === 'production' ?
  // eslint-disable-next-line no-underscore-dangle
  null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export const persistor = persistStore(store);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}
