// @flow

import React from 'react';

import HelloAsyncButton from '../containers/hello-async-button';
import MessageAsync from '../containers/message-async';

const HelloAsyncPage = () => (
  <div>
    <MessageAsync />
    <HelloAsyncButton />
  </div>
);

export default HelloAsyncPage;
