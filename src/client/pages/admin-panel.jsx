// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { apiTestAdmin } from '../api/admin';

type Props = {
  apiTestAdmin: () => Promise,
}

class AdminPanelPage extends React.Component<Props> {
  constructor() {
    super();
    this.state = { message: 'Admin Panel' };

    this.handleApiTest = this.handleApiTest.bind(this);
  }

  handleApiTest() {
    this.props.apiTestAdmin()
      .then((response) => {
        this.setState({ message: response.message });
      })
      .catch(() => {
        this.setState({ message: 'Failed to get response from server.' });
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <Button onClick={this.handleApiTest}>Say hello to the server!</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ apiTestAdmin: () => dispatch(apiTestAdmin()) });

export default connect(null, mapDispatchToProps)(AdminPanelPage);
