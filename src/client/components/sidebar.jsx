// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { Button } from 'reactstrap';

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  ADMIN_PANEL_PAGE_ROUTE,
  LITTERS,
  NOT_FOUND_DEMO_PAGE_ROUTE,
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
        { route: LITTERS, label: 'Litters' },
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
        { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
        { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
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
