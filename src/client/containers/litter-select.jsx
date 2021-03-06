// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { getLitters as _getLitters } from '../api/volunteer';

import AsyncOptionsSelect from './async-options-select';

type Props = {
  getLitters: () => Promise,
};

const LitterSelect = ({ getLitters, ...rest }: Props) => (
  <AsyncOptionsSelect
    options={() => getLitters().then(litters => _.map(litters, litter => ({
        value: litter.id,
        label: litter.name,
      })))}
    {...rest}
  />
);

export default connect(null, dispatch => ({
  getLitters: () => dispatch(_getLitters()),
}))(LitterSelect);
