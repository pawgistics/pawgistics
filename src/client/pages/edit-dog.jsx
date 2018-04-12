// @flow

import React from 'react';
import { connect } from 'react-redux';

import EditPage from './edit';

import DogEditFields from '../components/dog-edit-fields';

import { getDog } from '../api/volunteer';
import { updateDog, removeDog } from '../api/admin';

const EditDogPage = props => (
  <EditPage
    editFields={DogEditFields}
    entityName="dog"
    {...props}
  />
);

export default connect(null, dispatch => ({
  getEnt: id => dispatch(getDog(id)).then(dog => ({
    name: dog.name,
    litter_id: dog.litter.id,
    chip: dog.chip,
    instructor_id: dog.instructor.id,
    gender: dog.gender,
    active: dog.active,
    uri: dog.uri,
  })),
  updateEnt: (id, entity) => dispatch(updateDog(id, entity)),
  removeEnt: id => dispatch(removeDog(id)),
}))(EditDogPage);
