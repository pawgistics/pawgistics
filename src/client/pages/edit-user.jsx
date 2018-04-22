// @flow

import React from 'react';
import { connect } from 'react-redux';

import EditPage from './edit';

import UserEditFields from '../components/user-edit-fields';

import { getUser } from '../api/volunteer';
import { updateUser, removeUser } from '../api/admin';

const EditUserPage = props => (
  <EditPage
    editFields={UserEditFields}
    entityName="user"
    {...props}
  />
);

export default connect(null, dispatch => ({
  getEnt: id => dispatch(getUser(id)).then(user => ({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: '',
    phone_number: user.phone_number,
    admin: user.admin,
    active: user.active,
    uri: user.uri,
    passChanged: false,
  })),
  updateEnt: (id, entity) => dispatch(updateUser(id, entity)),
  removeEnt: id => dispatch(removeUser(id)),
}))(EditUserPage);
