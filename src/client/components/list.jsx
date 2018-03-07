// @flow

import React from 'react';

import ChevronRight from 'react-icons/lib/fa/chevron-right';
import { Row, ListGroup, ListGroupItem } from 'reactstrap';

import '../styles/components/list.m.scss';

type Props = {
  items: [],
}

const List = ({ items }: Props) => (
  <ListGroup>
    {items.map(item => (
      <ListGroupItem tag="a" href="#" key={item.name} action>
        <Row styleName="item">
          <img src="/static/img/dog1.jpg" alt="Doggo" className="border rounded" />
          <h3>{item.name}</h3>
          <ChevronRight size="2em" className="ml-auto" />
        </Row>
      </ListGroupItem>
    ))}
  </ListGroup>
);

export default List;
