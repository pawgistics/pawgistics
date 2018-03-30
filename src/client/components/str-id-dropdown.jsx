/* eslint-disabel */
// @flow
// Broken but clever reusable dropdown
// eslint disabled b/c this is very much experimental and very broken

import React from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/pages/dogDetail.m.scss';

type Props = {
  getitems(): Promise,
  title: String,
  displayValue: String,
  displayId: String,
}

class StrIdDropdown extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { items: {} };
    this.props.getitems()
      .then((items) => {
        console.log(items);
        this.setState({ items });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }

  render() {
    return (
      <Input type="select" name={this.props.title} >
        {this.state.items.map(item => <option value={item[this.props.displayId]}>{item[this.props.displayValue]}</option>)}
      </Input>
    );
  }
}
export default connect(null, dispatch => ({
  getitems: items => dispatch(getitems()),
}))(StrIdDropdown);
// export default StrIdDropdown;
