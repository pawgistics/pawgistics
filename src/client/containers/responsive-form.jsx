// @flow

import React from 'react';
import Media from 'react-media';
import { ListGroup } from 'reactstrap';

import '../styles/containers/responsive-list-group.m.scss';

type Props = {
  children: React.Node,
}

const ResponsiveForm = ({ children }: Props) => (
  <Media query="(min-width: 992px)">
    {(matches) => {
      if (matches) {
        const children2 = children.toArray();
        const children1 = children2.splice(0, Math.ceil(children2.length / 2));
        return (
          <div styleName="cols">
            <ListGroup styleName="group" className="mr-2">
              {children1}
            </ListGroup>
            <ListGroup styleName="group" className="ml-2">
              {children2}
            </ListGroup>
          </div>
        );
      }
      return (
        <ListGroup styleName="group">
          {children}
        </ListGroup>
      );
    }}
  </Media>
);

export default ResponsiveForm;
