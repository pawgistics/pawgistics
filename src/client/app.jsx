// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import { LOGIN_PAGE_ROUTE } from '../shared/routes';

type Props = {
  isAuthenticated: boolean,
}

const App = ({ isAuthenticated }: Props) => (
  <Switch>
    <Route
      exact
      path={LOGIN_PAGE_ROUTE}
      render={() => (isAuthenticated ? <Redirect to="/" /> : <LoginPage />)}
    />
    <Route
      render={() => (isAuthenticated ? <DashboardPage /> : <Redirect to={LOGIN_PAGE_ROUTE} />)}
    />
  </Switch>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(mapStateToProps)(App));
