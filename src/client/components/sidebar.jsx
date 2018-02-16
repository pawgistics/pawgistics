// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { Button } from 'reactstrap';

import {
  HOME_PAGE_ROUTE,
  USER_MANAGEMENT_PAGE_ROUTE,
  DOG_DETAIL_PAGE_ROUTE,
  DOGS_PAGE_ROUTE,
  ADMIN_PANEL_PAGE_ROUTE,
  DOG_MANAGEMENT_PAGE_ROUTE,
  USER_DETAIL_PAGE_ROUTE,
  ADD_DOG_PAGE_ROUTE,
  USER_EDIT_PAGE_ROUTE,
  DOG_EDIT_PAGE_ROUTE,
} from '../../shared/routes';
import { logoutUser } from '../actions/auth';
import styles from '../styles/components/sidebar.m.scss';

type Props = {
  isAdmin: boolean,
  handleLogout: () => void,
}

const Sidebar = ({ isAdmin, handleLogout }: Props) => (
  <nav styleName="sidebar">
    <div styleName="header">
      <h3>Pawgistics</h3>
    </div>

    <ul styleName="pages">
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: DOG_MANAGEMENT_PAGE_ROUTE, label: 'Dog Management Page' },
        { route: ADD_DOG_PAGE_ROUTE, label: 'Add Dog Page' },
        { route: USER_MANAGEMENT_PAGE_ROUTE, label: 'User Management Page' },
        { route: DOG_DETAIL_PAGE_ROUTE, label: 'Dog Detail Page' },
        { route: USER_DETAIL_PAGE_ROUTE, label: 'User Detail Page' },
        { route: USER_EDIT_PAGE_ROUTE, label: 'User Edit Page' },
        { route: DOG_EDIT_PAGE_ROUTE, label: 'Dog Edit Page' },
        { route: DOGS_PAGE_ROUTE, label: 'Dogs' },
        ...(isAdmin ? [
          { route: ADMIN_PANEL_PAGE_ROUTE, label: 'Admin Panel' },
        ] : []),
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeClassName="active" exact>{link.label}</NavLink>
        </li>
      ))}
    </ul>
    <ul styleName="buttons">
      <li><Button color="secondary" block onClick={handleLogout}>Log out</Button></li>
    </ul>
  </nav>
);

const mapStateToProps = state => ({
  isAdmin: state.auth.get('isAdmin'),
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => { dispatch(logoutUser()); },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CSSModules(Sidebar, styles)));
