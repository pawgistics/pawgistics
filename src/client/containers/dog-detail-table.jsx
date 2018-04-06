// @flow

import React from 'react';
import _ from 'lodash';

import DetailTable from '../components/detail-table';

import { dogDetailPageRoute } from '../routes';

type Props = { dogs: [{}] }

const DogDetailTable = ({ dogs }: Props) => (
  <DetailTable
    headings={['Dog Name', 'Chip ID', 'Custody']}
    keys={['name', 'chip', 'custody']}
    items={_.map(dogs, dog => _.assign({}, dog, { custody: 'Canine Assistants' }))}
    detailRoute={{
      template: dogDetailPageRoute,
      key: 'id',
    }}
  />
);

export default DogDetailTable;
