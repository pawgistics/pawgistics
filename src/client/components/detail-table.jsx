// @flow

import React from 'react';
import _ from 'lodash';
// import CSSModules from 'react-css-modules';

// import ChevronRight from 'react-icons/lib/fa/chevron-right';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// import styles from '../styles/components/table.m.scss';

type Props = {
  headings: [string],
  keys: {},
  items: [],
  detailRoute: {
    template: (string | number) => string,
    key: string
  }
}

const DetailTable = ({
  headings,
  keys,
  items,
  detailRoute,
}: Props) => (
  <Table hover>
    <thead>
      <tr>
        {headings.map(heading => <th key={heading}>{heading}</th>)}
        <th />
      </tr>
    </thead>
    <tbody>
      {_.map(items, (item, index) => (
        <tr key={index}>
          <th scope="row">{item[keys[headings[0]]]}</th>
          {_.map(_.drop(headings), (heading, hIndex) => (
            <td key={hIndex}>{item[keys[heading]]}</td>
          ))}
          <td>
            <Button tag={Link} to={detailRoute.template(item[detailRoute.key])} size="sm"block>View</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

// export default CSSModules(DetailTable, styles);
export default DetailTable;
