// @flow

import React from 'react';
import _ from 'lodash';

import DetailTable from '../components/detail-table';

type Props = { dogs: [{}] }

const DogDetailTable = ({ dogs }: Props) => (
  <DetailTable
    headings={['Dog Name', 'Dog ID', 'Custody']}
    keys={{ 'Dog Name': 'name', 'Dog ID': 'chipId', Custody: 'custody' }}
    items={_.map(dogs, dog => _.assign({}, dog, { custody: 'Canine Assistants' }))}
    detailRoute={{
      template: chipId => `/dogDetail/${chipId}`,
      key: 'chipId',
    }}
  />
);

export default DogDetailTable;
