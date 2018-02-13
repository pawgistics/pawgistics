// @flow

import React from 'react';
import { Switch, Route } from 'react-router';
import CSSModules from 'react-css-modules';

// import { APP_NAME } from '../../shared/config';
import Sidebar from '../components/sidebar';
import AdminRoute from '../components/admin-route';
import HomePage from './home';
import LittersPage from './litters';
import HelloPage from './hello';
import HelloAsyncPage from './hello-async';
import AdminPanelPage from './admin-panel';
import VickyTestPage from './vicky-test';
import AddDogPage from './addDog';
import NotFoundPage from './not-found';
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  ADMIN_PANEL_PAGE_ROUTE,
  LITTERS,
  VICKY_TEST_PAGE_ROUTE,
  ADD_DOG_PAGE_ROUTE,
} from '../../shared/routes';

import styles from '../styles/pages/dashboard.m.scss';

const Dashboard = () => (
  <div>
    {/* <h1>{APP_NAME}</h1> */}
    <Sidebar />
    <div styleName="content">
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
        <Route path={LITTERS} component={LittersPage} />
        <Route path={HELLO_PAGE_ROUTE} component={HelloPage} />
        <Route path={HELLO_ASYNC_PAGE_ROUTE} component={HelloAsyncPage} />
        <Route path={HELLO_ASYNC_PAGE_ROUTE} component={HelloAsyncPage} />
        <Route path={VICKY_TEST_PAGE_ROUTE} component={VickyTestPage} />
        <Route path={ADD_DOG_PAGE_ROUTE} component={AddDogPage} />
        <AdminRoute path={ADMIN_PANEL_PAGE_ROUTE} component={AdminPanelPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default CSSModules(Dashboard, styles);
