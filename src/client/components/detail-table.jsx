// @flow

import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';
import ChevronRight from 'react-icons/lib/io/chevron-right';
import Loop from 'react-icons/lib/io/loop';

import '../styles/components/detail-table.m.scss';

type Props = {
  history: Object,
  headings: [string],
  keys: [string],
  items: [{}],
  loading?: boolean,
  onReload?: () => void,
  detailRoute?: {
    template: (string | number) => string,
    key: string
  }
}

const DetailTable = ({
  history,
  headings,
  keys,
  items,
  loading,
  onReload,
  detailRoute,
}: Props) => (
  <div styleName="table">
    {headings.map(heading =>
      <div styleName="header" key={heading}><span>{heading}</span></div>)}
    {detailRoute && onReload ? (
      // eslint-disable-next-line
      <div
        styleName="header clickable"
        className="d-flex"
        onClick={onReload}
      >
        <span className="ml-auto"><Loop size="2rem" styleName={loading ? 'rotating' : ''} /></span>
      </div>
    ) : <div styleName="header" />}
    {_.map(items, (item, index) => _.concat(_.map(keys, (key, kIndex) => (
          // eslint-disable-next-line
          <div
            key={kIndex}
            styleName={`row${detailRoute ? ' clickable' : ''}`}
            onClick={
              detailRoute &&
              (() => history.push(detailRoute.template(item[detailRoute.key])))
            }
          >
            <span>{item[key]}</span>
          </div>
        )), detailRoute && (
          // eslint-disable-next-line
          <div
            key={`${index}_`}
            styleName="row clickable"
            className="d-flex"
            onClick={
              detailRoute &&
              (() => history.push(detailRoute.template(item[detailRoute.key])))
            }
          >
            <span className="ml-auto"><ChevronRight size="2rem" /></span>
          </div>
        )))}
  </div>
);

DetailTable.defaultProps = {
  loading: null,
  onReload: null,
  detailRoute: null,
};

export default withRouter(DetailTable);
