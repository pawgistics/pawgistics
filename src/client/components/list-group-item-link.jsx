// @flow

import React from 'react';
import { withRouter } from 'react-router';
import { ListGroupItem } from 'reactstrap';
import ChevronRight from 'react-icons/lib/io/chevron-right';

import '../styles/components/list-group-item-link.m.scss';

type Props = {
  history: Object,
  to: string,
  children: React.Node,
}

const ListGroupItemLink = ({ history, to, children }: Props) => (
  <ListGroupItem styleName="clickable" className="d-flex" onClick={() => history.push(to)}>
    <span className="text-truncate">
      {children}
    </span>
    <span className="ml-auto">
      <ChevronRight size="1.3rem" />
    </span>
  </ListGroupItem>
);

export default withRouter(ListGroupItemLink);
