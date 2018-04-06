// @flow

import React from 'react';
import { Switch, Route } from 'react-router';

import Sidebar from '../components/sidebar';
import AdminRoute from '../containers/admin-route';

import HomePage from './home';
import DogsPage from './dogs';
import UsersPage from './users';
import FostersPage from './fosters';
import DogDetailPage from './dog-detail';
import ReturnDogPage from './return-dog';
// import MyProfilePage from './my-profile';
import UserDetailPage from './user-detail';
import AddDogPage from './add-dog';
import AddUserPage from './add-user';
import EditUser from './edit-user';
import EditDogPage from './edit-dog';
import NotFoundPage from './not-found';

import {
  HOME_PAGE_ROUTE,
  DOGS_PAGE_ROUTE,
  USERS_PAGE_ROUTE,
  DOG_DETAIL_PAGE_ROUTE,
  // MY_PROFILE_PAGE_ROUTE,
  USER_DETAIL_PAGE_ROUTE,
  FOSTERS_PAGE_ROUTE,
  RETURN_DOG_PAGE_ROUTE,
  ADD_DOG_PAGE_ROUTE,
  ADD_USER_PAGE_ROUTE,
  EDIT_USER_PAGE_ROUTE,
  EDIT_DOG_PAGE_ROUTE,
} from '../routes';

import '../styles/pages/dashboard.m.scss';

const Dashboard = () => (
  <div>
    <Sidebar />
    <div styleName="content">
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
        <Route exact path={DOGS_PAGE_ROUTE} component={DogsPage} />
        <Route exact path={USERS_PAGE_ROUTE} component={UsersPage} />
        <Route exact path={FOSTERS_PAGE_ROUTE} component={FostersPage} />
        <Route exact path={DOG_DETAIL_PAGE_ROUTE} component={DogDetailPage} />
        <Route exact path={USER_DETAIL_PAGE_ROUTE} component={UserDetailPage} />
        {/* <Route path={MY_PROFILE_PAGE_ROUTE} component={MyProfilePage} /> */}
        <AdminRoute exact path={ADD_DOG_PAGE_ROUTE} component={AddDogPage} />
        <AdminRoute exact path={ADD_USER_PAGE_ROUTE} component={AddUserPage} />
        <AdminRoute exact path={RETURN_DOG_PAGE_ROUTE} component={ReturnDogPage} />
        <AdminRoute exact path={EDIT_USER_PAGE_ROUTE} component={EditUser} />
        <AdminRoute exact path={EDIT_DOG_PAGE_ROUTE} component={EditDogPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default Dashboard;
