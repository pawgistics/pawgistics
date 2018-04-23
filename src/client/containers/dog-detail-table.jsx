// @flow

import React from 'react';

import DetailTable from '../components/detail-table';

import { dogDetailPageRoute } from '../routes';

type Props = { dogs: [{}] }

const DogDetailTable = ({ dogs, ...rest }: Props) => (
  <DetailTable
    headings={['Dog Name', 'Chip ID']}
    keys={['name', 'chip']}
    items={dogs}
    detailRoute={{
      template: dogDetailPageRoute,
      key: 'id',
    }}
    {...rest}
  />
);

export default DogDetailTable;
