// @flow

import React, { Component } from 'react';

import Select from '../components/select';

type Props = {
  options: Promise,
};

type State = {
  options: [],
};

export default class PromiseOptionsSelect extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };

    this.props.options.then((options) => {
      this.setState({ options });
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
    });
  }
  render() {
    const { options, ...rest } = this.props;
    return (
      <Select options={this.state.options} {...rest} />
    );
  }
}
