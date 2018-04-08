// @flow

import React, { Component } from 'react';

import SelectBase, { createFilter } from 'react-select';

type Props = {
  options?: [],
  value?: any,
  onSelectValue?: (any) => void,
  inline?: boolean,
};

type State = {
  options: [],
  optionsMap: Map,
  value: ?{},
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

export default class Select extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.options !== prevState.options) {
      const newOptions = nextProps.options;
      const optionsMap = new Map(newOptions.map(opt => [opt.value, opt.label]));
      const label = optionsMap.get(nextProps.value);
      let value;
      if (!label) {
        value = null;
      } else {
        value = { value: nextProps.value, label };
      }
      return {
        options: nextProps.options,
        optionsMap,
        value,
      };
    }
    if ((nextProps.value && !prevState.value) ||
        (prevState.value && nextProps.value !== prevState.value.value)) {
      const label = prevState.optionsMap.get(nextProps.value);
      let value;
      if (!label) {
        value = null;
      } else {
        value = { value: nextProps.value, label };
      }
      return { value };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      // eslint-disable-next-line react/no-unused-state
      optionsMap: new Map(),
      value: null,
    };

    this.updateSelect = this.updateSelect.bind(this);
  }
  updateSelect(value) {
    if (this.props.onSelectValue) {
      this.props.onSelectValue(value.value);
    } else {
      this.setState({ value });
    }
  }
  render() {
    const {
      options,
      value,
      onSelectValue,
      ...rest
    } = this.props;
    return (
      <SelectBase
        options={this.state.options}
        value={this.state.value}
        onChange={this.updateSelect}
        filterOption={createFilter({ stringify: option => option.label })}
        styles={customStyles}
        {...rest}
      />
    );
  }
}
