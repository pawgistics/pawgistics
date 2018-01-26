// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { Button } from 'reactstrap';

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
} from '../../shared/routes';
import { logoutUser } from '../actions/logout';
import styles from '../styles/components/sidebar.m.scss';

type Props = {
  handleLogout: Function,
}

const Sidebar = ({ handleLogout }: Props) => (
  <nav styleName="sidebar">
    <div styleName="header">
      <h3>Pawgistics</h3>
    </div>

    <ul styleName="pages">
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
        { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
        { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
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

const mapDispatchToProps = dispatch => ({
  handleLogout: () => { dispatch(logoutUser()); },
});

export default connect(null, mapDispatchToProps)(CSSModules(Sidebar, styles));
