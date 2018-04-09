// @flow

import React from 'react';
import Media from 'react-media';
import { ListGroup } from 'reactstrap';

import '../styles/components/responsive-cols.m.scss';

type Props = {
  tag?: string | func,
  equalWidth?: boolean,
  className?: string,
  children: React.Node,
}

const ResponsiveCols = ({
  tag: Tag,
  equalWidth,
  children,
  className,
  ...rest
}: Props) => (
  <Media query="(min-width: 992px)">
    {(matches) => {
      const mergeClassNames = newName => (className ? `${className} ${newName}` : newName);
      if (matches) {
        const children2 = React.Children.toArray(children);
        const children1 = children2.splice(0, Math.ceil(children2.length / 2));
        return (
          <div styleName={equalWidth ? 'cols-eq' : 'cols-auto'}>
            <Tag styleName="col" className={mergeClassNames('mr-2')} {...rest}>
              {children1}
            </Tag>
            <Tag styleName="col" className={mergeClassNames('ml-2')} {...rest}>
              {children2}
            </Tag>
          </div>
        );
      }
      return (
        <ListGroup styleName="col" className={className} {...rest}>
          {children}
        </ListGroup>
      );
    }}
  </Media>
);

ResponsiveCols.defaultProps = {
  tag: 'div',
  equalWidth: false,
  className: '',
};

export default ResponsiveCols;
