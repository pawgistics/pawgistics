// @flow

import React from 'react';
import { ListGroup } from 'reactstrap';

import ResponsiveCols from './responsive-cols';

import '../styles/components/responsive-list-group.m.scss';

type Props = {
  children: React.Node,
}

const ResponsiveListGroup = ({ children }: Props) => (
  <ResponsiveCols tag={ListGroup} styleName="group">
    {children}
  </ResponsiveCols>
);

export default ResponsiveListGroup;
