// @flow

import React from 'react';

import DetailTable from '../components/detail-table';

// import { outingDetailPageRoute } from '../routes';

type Props = { outings: [{}], subjectName: string }

const OutingDetailTable = ({ outings, subjectName }: Props) => (
  <DetailTable
    headings={[subjectName, 'Date', 'Action']}
    keys={['name', 'date', 'action']}
    items={outings}
    detailRoute={{
      template: () => '#',
      key: 'id',
    }}
  />
);

export default OutingDetailTable;
