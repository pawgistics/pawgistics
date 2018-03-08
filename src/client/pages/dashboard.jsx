// @flow

import React from 'react';
import { Switch, Route } from 'react-router';

import Sidebar from '../components/sidebar';
import AdminRoute from '../containers/admin-route';
import HomePage from './home';
import DogManagementPage from './dogManagement';
import UserManagementPage from './userManagement';
import DogDetailPage from './dogDetail';
import DogsPage from './dogs';
import UserDetailPage from './userDetail';
import AddDogPage from './addDog';
import UserEditPage from './userEdit';
import DogEditPage from './dogEdit';
import NotFoundPage from './not-found';

import {
  HOME_PAGE_ROUTE,
  DOG_DETAIL_PAGE_ROUTE,
  DOGS_PAGE_ROUTE,
  DOG_MANAGEMENT_PAGE_ROUTE,
  USER_DETAIL_PAGE_ROUTE,
  USER_MANAGEMENT_PAGE_ROUTE,
  ADD_DOG_PAGE_ROUTE,
  USER_EDIT_PAGE_ROUTE,
  DOG_EDIT_PAGE_ROUTE,
} from '../../shared/routes';

import '../styles/pages/dashboard.m.scss';

const Dashboard = () => (
  <div>
    <Sidebar />
    <div styleName="content">
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
        <Route path={DOG_MANAGEMENT_PAGE_ROUTE} component={DogManagementPage} />
        <Route path={USER_MANAGEMENT_PAGE_ROUTE} component={UserManagementPage} />
        <Route path={DOG_DETAIL_PAGE_ROUTE} component={DogDetailPage} />
        <Route path={USER_DETAIL_PAGE_ROUTE} component={UserDetailPage} />
        <Route path={DOGS_PAGE_ROUTE} component={DogsPage} />
        <AdminRoute path={ADD_DOG_PAGE_ROUTE} component={AddDogPage} />
        <AdminRoute path={USER_EDIT_PAGE_ROUTE} component={UserEditPage} />
        <AdminRoute path={DOG_EDIT_PAGE_ROUTE} component={DogEditPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default Dashboard;
