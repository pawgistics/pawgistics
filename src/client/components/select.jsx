// @flow

import React, { Component } from 'react';

import SelectBase, { createFilter } from 'react-select';

type Props = {
  options: [],
  onSelectValue: (string) => void,
  isSearchable?: boolean,
};

type State = {
  selection: {},
};

// TODO: bring styling in line with rest of app
export default class Select extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
    };

    this.updateSelect = this.updateSelect.bind(this);
  }
  updateSelect(selection) {
    this.setState({ selection });
    this.props.onSelectValue(selection.value);
  }
  render() {
    return (
      <SelectBase
        options={this.props.options}
        value={this.state.selection}
        onChange={this.updateSelect}
        isSearchable={this.props.isSearchable}
        filterOption={createFilter({ stringify: option => option.label })}
      />
    );
  }
}
