// @flow

import React from 'react';
import _ from 'lodash';

import DetailTable from '../components/detail-table';

type Props = { users: [{}] }

const UserDetailTable = ({ users }: Props) => (
  <DetailTable
    headings={['First Name', 'Last Name', 'Email']}
    keys={{ 'First Name': 'fname', 'Last Name': 'lname', 'Email': 'email' }}
    items={_.map(users, user => _.assign({}, user, { custody: '' }))}
    detailRoute={{
      template: id => `/userDetail/${id}`,
      key: 'id',
    }}
  />
);

export default UserDetailTable;
