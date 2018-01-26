// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

type Props = {
  component: React.ComponentType,
  isAdmin: boolean,
}

const AdminRoute = ({ component: Component, isAdmin, ...rest }: Props) => (
  <Route
    {...rest}
    render={props => (isAdmin ?
      <Component {...props} /> :
      <Redirect to="/" />
    )}
  />
);

const mapStateToProps = state => ({
  isAdmin: state.auth.get('isAdmin'),
});

export default connect(mapStateToProps)(AdminRoute);
