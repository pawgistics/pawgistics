// @flow

import React from 'react';

import DetailTable from '../components/detail-table';

import { userDetailPageRoute } from '../routes';

type Props = { users: [{}] }

const UserDetailTable = ({ users, ...rest }: Props) => (
  <DetailTable
    headings={['First Name', 'Last Name', 'Email']}
    keys={['first_name', 'last_name', 'email']}
    items={users}
    detailRoute={{
      template: userDetailPageRoute,
      key: 'id',
    }}
    {...rest}
  />
);

export default UserDetailTable;
