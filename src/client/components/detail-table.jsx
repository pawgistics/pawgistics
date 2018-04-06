// @flow

import React from 'react';
import _ from 'lodash';

import ChevronRight from 'react-icons/lib/io/chevron-right';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../styles/components/detail-table.m.scss';

type Props = {
  headings: [string],
  keys: [string],
  items: [{}],
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
  <Table hover className="mb-0">
    <thead>
      <tr>
        {headings.map(heading =>
          <th className="text-nowrap align-middle" key={heading}>{heading}</th>)}
        <th className="col text-nowrap align-middle" />
      </tr>
    </thead>
    <tbody>
      {_.map(items, (item, index) => (
        <tr
          key={index}
          styleName="row"
          onClick={e => e.currentTarget.lastChild.firstChild.firstChild.click()}
        >
          <th scope="row" className="text-nowrap align-middle">{item[keys[0]]}</th>
          {_.map(_.drop(keys), (key, kIndex) => (
            <td className="text-nowrap align-middle" key={kIndex}>{item[key]}</td>
          ))}
          <td className="col text-nowrap align-middle">
            <div className="d-flex">
              <Link
                to={{
                  pathname: detailRoute.template(item[detailRoute.key]),
                  // state: { item },
                }}
                // data={item}
                className="ml-auto"
                styleName="link-unstyled"
              >
                <ChevronRight size="2em" />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DetailTable;
