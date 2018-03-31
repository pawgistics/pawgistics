// @flow

import React, { Component } from 'react';

import Select from '../components/select';

type Props = {
  optionsPromise: Promise,
  onSelectValue: (string) => void,
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

    this.props.optionsPromise.then((options) => {
      this.setState({ options });
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
    });
  }
  render() {
    return (
      <Select
        options={this.state.options}
        onSelectValue={this.props.onSelectValue}
      />
    );
  }
}
