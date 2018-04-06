// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { getInstructors as _getInstructors } from '../api/volunteer';

import PromiseOptionsSelect from './promise-options-select';

type Props = {
  getInstructors: () => Promise,
};

const InstructorSelect = ({ getInstructors, ...rest }: Props) => (
  <PromiseOptionsSelect
    options={getInstructors().then(instructors => _.map(instructors, instructor => ({
        value: instructor.id,
        label: instructor.name,
      })))}
    {...rest}
  />
);

export default connect(null, dispatch => ({
  getInstructors: () => dispatch(_getInstructors()),
}))(InstructorSelect);
