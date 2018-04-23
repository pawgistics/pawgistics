// @flow

import React from 'react';
import _ from 'lodash';

import DetailTable from '../components/detail-table';

import { requestDetailPageRoute } from '../routes';

type Props = { requests: [{}], view: string }

const RequestsDetailTable = ({ requests, view, ...rest }: Props) => (
  <DetailTable
    headings={[
      ...(view !== 'user' ? ['Volunteer'] : []),
      ...(view !== 'dog' ? ['Dog'] : []),
      'Pickup',
      'Return',
      ...(view !== 'instructor' ? ['Status'] : []),
    ]}
    keys={[
      ...(view !== 'user' ? ['user_name'] : []),
      ...(view !== 'dog' ? ['dog_name'] : []),
      'pickup_date',
      'return_date',
      ...(view !== 'instructor' ? ['decision_status'] : []),
    ]}
    items={_.map(requests, request => _.assign({}, request, {
      user_name: request.user.name,
      dog_name: request.dog.name,
    }))}
    detailRoute={{
      template: requestDetailPageRoute,
      key: 'id',
    }}
    {...rest}
  />
);

export default RequestsDetailTable;
