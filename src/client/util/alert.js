// @flow

import React from 'react';

export const { Provider: AlertProvider, Consumer: AlertConsumer } = React.createContext({
  showAlert: () => {},
  hideAlert: () => {},
});
