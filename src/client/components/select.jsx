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

const customStyles = {
  control: (base, { isDisabled, isFocused }) => ({
    ...base,
    backgroundColor: isDisabled ? '#e9ecef' : '#fff',
    borderColor: isFocused ? '#e476a9' : '#ced4da',
    borderRadius: '0.25rem',
    boxShadow: isFocused ? '0 0 0 0.2rem rgba(183, 36, 104, 0.25)' : null,
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out',
    '&:hover': null,
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: isSelected ? 'rgba(183, 36, 104, 0.85)' : isFocused ? 'rgba(183, 36, 104, 0.15)' : 'transparent',
    ':active': {
      backgroundColor: isSelected ? 'rgba(183, 36, 104, 0.85)' : 'rgba(183, 36, 104, 0.35)',
    },
  }),
  container: base => ({
    ...base,
    color: '#495057',
  }),
  placeholder: base => ({
    ...base,
    color: '#6c757d',
  }),
  singleValue: base => ({
    ...base,
    color: 'inherit',
  }),
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
        styles={customStyles}
      />
    );
  }
}
