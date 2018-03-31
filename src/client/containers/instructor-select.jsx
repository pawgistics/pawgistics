// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { getAdmins as _getAdmins } from '../api/volunteer';

import PromiseOptionsSelect from './promise-options-select';

type Props = {
  getAdmins: () => Promise,
  onSelectValue: (string) => void,
};

const InstructorSelect = ({ getAdmins, onSelectValue }: Props) => (
  <PromiseOptionsSelect
    optionsPromise={getAdmins().then(admins => _.map(admins, admin => ({
        value: admin.id,
        label: `${admin.first_name} ${admin.last_name}`,
      })))}
    onSelectValue={onSelectValue}
  />
);

export default connect(null, dispatch => ({
  getAdmins: () => dispatch(_getAdmins()),
}))(InstructorSelect);
