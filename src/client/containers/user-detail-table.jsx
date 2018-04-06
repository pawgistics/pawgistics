// @flow

import React from 'react';
import _ from 'lodash';

import DetailTable from '../components/detail-table';

import { userDetailPageRoute } from '../routes';

type Props = { users: [{}] }

const UserDetailTable = ({ users }: Props) => (
  <DetailTable
    headings={['First Name', 'Last Name', 'Email']}
    keys={['first_name', 'last_name', 'email']}
    items={_.map(users, user => _.assign({}, user, { custody: '' }))}
    detailRoute={{
      template: userDetailPageRoute,
      key: 'id',
    }}
  />
);

export default UserDetailTable;
