// @flow

import React from 'react';
import { connect } from 'react-redux';

import AddPage from './add';

import DogEditFields from '../components/dog-edit-fields';

import { createDog } from '../api/admin';

const AddDogPage = props => (
  <AddPage
    editFields={DogEditFields}
    entityName="dog"
    {...props}
  />
);

export default connect(null, dispatch => ({
  createEnt: entity => dispatch(createDog(entity)),
}))(AddDogPage);
