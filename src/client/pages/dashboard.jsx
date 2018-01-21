// @flow

import React from 'react';
import { Switch, Route } from 'react-router';
import CSSModules from 'react-css-modules';

// import { APP_NAME } from '../../shared/config';
import Sidebar from '../components/sidebar';
import HomePage from './home';
import HelloPage from './hello';
import HelloAsyncPage from './hello-async';
import NotFoundPage from './not-found';
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
} from '../../shared/routes';

import styles from '../styles/pages/dashboard.m.scss';

const Dashboard = () => (
  <div>
    {/* <h1>{APP_NAME}</h1> */}
    <Sidebar />
    <div styleName="content">
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
        <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />} />
        <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default CSSModules(Dashboard, styles);
