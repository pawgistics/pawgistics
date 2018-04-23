// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

import {
  DOGS_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
  // FOSTERS_PAGE_ROUTE,
  MY_PROFILE_PAGE_ROUTE,
  // RETURN_DOG_PAGE_ROUTE,
  ADD_LITTER_PAGE_ROUTE,
  REQUESTS_PAGE_ROUTE,
} from '../routes';
import { logoutUser } from '../actions/auth';
import '../styles/components/sidebar.m.scss';

type Props = {
  isAdmin: boolean,
  active: boolean,
  handleLogout: () => void,
  onClick?: () => void,
}

const Sidebar = ({
  isAdmin, active, handleLogout, onClick,
}: Props) => (
  <nav styleName="sidebar" className={active ? 'active' : ''}>
    <div styleName="header">
      <h3>Pawgistics</h3>
    </div>
    <ul styleName="pages">
      {[
        // { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: REQUESTS_PAGE_ROUTE, label: 'Requests' },
        { route: DOGS_PAGE_ROUTE, label: 'Dogs' },
        { route: USERS_PAGE_ROUTE, label: 'Users' },
        // { route: FOSTERS_PAGE_ROUTE, label: 'Fosters' },
        // { route: REQUEST_DOG_PAGE_ROUTE, label: 'Outing Request' },
        // { route: RETURN_DOG_PAGE_ROUTE, label: 'Return Dog' },
        // { route: DOG_DETAIL_PAGE_ROUTE, label: 'Dog Detail Page' },
        // { route: USER_DETAIL_PAGE_ROUTE, label: 'My Profile Page' },
        // { route: DOGS_PAGE_ROUTE, label: 'Dogs' },
        ...(isAdmin ? [
          { route: ADD_LITTER_PAGE_ROUTE, label: 'Add Litter' },
        //   // { route: ADD_DOG_PAGE_ROUTE, label: 'Add Dog Page' },
        //   // { route: ADD_USER_PAGE_ROUTE, label: 'Add User Page' },
        //   // { route: EDIT_USER_PAGE_ROUTE, label: 'Edit User Page' },
        //   // { route: EDIT_DOG_PAGE_ROUTE, label: 'Edit Dog Page' },
        ] : []),
        { route: MY_PROFILE_PAGE_ROUTE, label: 'My Profile Page' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} onClick={onClick} activeClassName="active" exact>{link.label}</NavLink>
        </li>
      ))}
    </ul>
    <ul styleName="buttons">
      <li><Button block onClick={handleLogout} size="lg">Log Out</Button></li>
    </ul>
  </nav>
);

Sidebar.defaultProps = {
  onClick: () => {},
};

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => { dispatch(logoutUser()); },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar));
