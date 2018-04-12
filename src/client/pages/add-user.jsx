// @flow

import React from 'react';
import { connect } from 'react-redux';

import AddPage from './add';

import UserEditFields from '../components/user-edit-fields';

import { createUser } from '../api/admin';

const AddUserPage = props => (
  <AddPage
    editFields={UserEditFields}
    entityName="user"
    {...props}
  />
);

export default connect(null, dispatch => ({
  createEnt: entity => dispatch(createUser(entity)),
}))(AddUserPage);
