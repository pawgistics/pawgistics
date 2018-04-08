// @flow

import React from 'react';
import _ from 'lodash';

import ChevronRight from 'react-icons/lib/io/chevron-right';
import { Link } from 'react-router-dom';

import '../styles/components/detail-table.m.scss';

type Props = {
  headings: [string],
  keys: [string],
  items: [{}],
  detailRoute?: {
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
  <div styleName="table">
    {headings.map(heading =>
      <div styleName="header" key={heading}><span>{heading}</span></div>)}
    {detailRoute && <div styleName="header" />}
    {_.map(items, (item, index) => {
      let linkRef;
      return _.concat(_.map(keys, (key, kIndex) => (
          // eslint-disable-next-line
          <div styleName={`row${detailRoute ? ' clickable' : ''}`} key={kIndex} onClick={detailRoute && ((e) => linkRef.handleClick(e))}><span>{item[key]}</span></div>
        )), detailRoute && (
          <div styleName={`row${detailRoute ? ' clickable' : ''}`} key={`${index}_`} className="d-flex">
            <span className="ml-auto">
              <Link
                ref={(link) => { linkRef = link; }}
                to={{
                  pathname: detailRoute.template(item[detailRoute.key]),
                }}
                styleName="link-unstyled"
              >
                <ChevronRight size="2em" />
              </Link>
            </span>
          </div>
        ));
    })}
  </div>
);

DetailTable.defaultProps = {
  detailRoute: null,
};

export default DetailTable;
