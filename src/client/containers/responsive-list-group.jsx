// @flow

import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { ListGroup, ListGroupItem } from 'reactstrap';

import '../styles/containers/responsive-list-group.m.scss';

type Props = {
  items: [string],
}

const ResponsiveListGroup = ({ items }: Props) => (
  <Media query="(min-width: 992px)">
    {(matches) => {
      if (matches) {
        const items2 = items.slice();
        const items1 = items2.splice(0, Math.ceil(items2.length / 2));
        return (
          <div styleName="cols">
            <ListGroup styleName="group" className="mr-2">
              {_.map(items1, (item, index) => (
                <ListGroupItem key={index}>{item}</ListGroupItem>
              ))}
            </ListGroup>
            <ListGroup styleName="group" className="ml-2">
              {_.map(items2, (item, index) => (
                <ListGroupItem key={index}>{item}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        );
      }
      return (
        <ListGroup styleName="group">
          {_.map(items, (item, index) => (
            <ListGroupItem key={index}>{item}</ListGroupItem>
          ))}
        </ListGroup>
      );
    }}
  </Media>
);

export default ResponsiveListGroup;
