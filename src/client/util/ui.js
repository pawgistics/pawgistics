// @flow

import React from 'react';

export const { Provider: UIProvider, Consumer: UIConsumer } = React.createContext({
  showAlert: () => {},
  showConfirmation: () => {},
});
